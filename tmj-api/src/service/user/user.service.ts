import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email, isActive: true });
    }

    async preRegisterUserAsync(user: User): Promise<any> {
        const salt = await this.getSalt();
        user.salt = salt;

        const hashedPassword = await this.hash(user.password, salt);

        user.password = hashedPassword;

        this.sendConfirmationEmail(user);

        await this.userRepository.insert(user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**@description Envia e-mail de confimação do usuário */
    private sendConfirmationEmail(user: User): void {
        throw Error('Confirmation e-mail not implemented');
    }

    private async getSalt(): Promise<string> {
        return await bcrypt.genSalt();
    }

    private async hash(data: string, salt: string): Promise<string> {
        return await bcrypt.hash(data, salt);
    }
}
