import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as aws from 'aws-sdk';
import { Email } from 'src/shared/models/email.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {

    constructor(
        @InjectRepository(Email)
        private readonly emailRepository: Repository<Email>) {
    }

    async sendEmail(templateId: number, destinationEmail: string, parameters: any) {

        const emailFromRepo = await this.emailRepository.findOne(templateId);
        let htmlTemplate = emailFromRepo.htmlTemplate.replace(/(\r\n|\n|\r)/gm, '');

        var parameterKeys = Object.keys(parameters);

        parameterKeys.forEach((value, index) => {
            const re = new RegExp(value, 'g');
            htmlTemplate = htmlTemplate.replace(re, parameters[value]);
        });

        const ses = new aws.SES({ region: 'us-east-1' });

        ses.sendEmail({
            Source: 'renan.cds0911@gmail.com',
            Destination: {
                ToAddresses: [destinationEmail]
            },
            Message: {
                Body: {
                    Html: {
                        Data: htmlTemplate
                    }
                },
                Subject: {
                    Data: 'TMJ - E-mail'
                }
            }
        }, (err, data) => {
            console.log(data);

            console.log('Error ' + err);
        });
    }
}
