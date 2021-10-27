import { Email } from 'src/shared/models/email.entity';
import { Repository } from 'typeorm';
export declare class EmailService {
    private readonly emailRepository;
    constructor(emailRepository: Repository<Email>);
    sendEmail(templateId: number, destinationEmail: string, parameters: any): Promise<void>;
}
