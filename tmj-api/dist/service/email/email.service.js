"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const aws = require("aws-sdk");
let EmailService = class EmailService {
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
};
EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map