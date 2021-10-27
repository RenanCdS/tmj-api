"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aws = require("aws-sdk");
const email_entity_1 = require("../../shared/models/email.entity");
const typeorm_2 = require("typeorm");
let EmailService = class EmailService {
    constructor(emailRepository) {
        this.emailRepository = emailRepository;
    }
    async sendEmail(templateId, destinationEmail, parameters) {
        const emailFromRepo = await this.emailRepository.findOne(templateId);
        let htmlTemplate = emailFromRepo.htmlTemplate;
        var parameterKeys = Object.keys(parameters);
        parameterKeys.forEach((value, index) => {
            htmlTemplate = htmlTemplate.replace(value, parameters[value]);
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
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_entity_1.Email)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map