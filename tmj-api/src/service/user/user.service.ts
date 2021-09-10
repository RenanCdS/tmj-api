import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Hash } from 'src/shared/models/hash.entity';
import { HashType, UserStatus } from 'src/shared/enum';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Hash)
        private readonly hashRepository: Repository<Hash>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find({ where: [
            { isActive: true }
        ]});
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email, isActive: true });
    }

    async confirmUserEmail(hash: string, userId: number): Promise<void> {
        const userHash = await this.hashRepository.findOne({ where: [
            { hash: hash },
            { isActive: true },
            { userId: userId }
        ]});

        if (userHash !== null && userHash !== undefined) {

            if (userHash.expiration.getTime() <= new Date().getTime()) {
                return Promise.reject(new ErrorResponseDto(201, 'hash expirado'));
            }

            const user = await this.userRepository.findOne({ userId });
            user.userStatus = UserStatus.ACTIVE;

            await this.userRepository.save(user);

            userHash.expiration = new Date();

            await this.hashRepository.save(userHash);

            return;
        }

        return Promise.reject(new ErrorResponseDto(200, 'hash não encontrado'));
    }

    async preRegisterUserAsync(user: User): Promise<any> {
        const userFromRepo = await this.userRepository.findOne({ email: user.email });

        if (userFromRepo !== null && userFromRepo !== undefined) {
            return Promise.reject(new ErrorResponseDto(300, 'usuário já está cadastrado.'));
        }

        const salt = await this.getSalt();
        user.salt = salt;

        const hashedPassword = await this.hash(user.password, salt);

        user.password = hashedPassword;
        user.userStatus = UserStatus.PENDING_EMAIL;

        await this.userRepository.insert(user);

        const confirmationEmailHash = new Hash();
        
        confirmationEmailHash.hash = this.getHash();
        confirmationEmailHash.user = user;
        confirmationEmailHash.hashType = HashType.EMAIL_CONFIRMATION;
        confirmationEmailHash.expiration = new Date();
        confirmationEmailHash.expiration
                            .setMinutes(confirmationEmailHash.expiration.getMinutes() + 20);
        
        await this.hashRepository.insert(confirmationEmailHash);

        this.sendConfirmationEmail(user, confirmationEmailHash.hash);
    }

    getHash(): string {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**@description Envia e-mail de confimação do usuário */
    private sendConfirmationEmail(user: User, hash: string): void {
        // throw Error('Confirmation e-mail not implemented');
    }

    private async getSalt(): Promise<string> {
        return await bcrypt.genSalt();
    }

    private async hash(data: string, salt: string): Promise<string> {
        return await bcrypt.hash(data, salt);
    }
}
