import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class EmailService {

    sendEmail() {
        var ses = new aws.SES({ region: 'us-east-1' });
        
        ses.sendEmail({
            Source: 'renan.cds0911@gmail.com',
            Destination: {
                ToAddresses: ['renan.cds0911@gmail.com']
            },
            Message: {
                Body: {
                    Text: {
                        Data: 'E-mail teste body'
                    }
                },
                Subject: {
                    Data: 'E-mail teste subject'
                }
            }
        }, (err, data) => {
            console.log(data);

            console.log('Error ' + err);
        });
    }
}
