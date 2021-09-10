import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Hash } from 'src/shared/models/hash.entity';
import { ErrorCodes, ErrorMessages, HashType, UserStatus } from 'src/shared/enum';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UserService {
    constructor(
        private readonly hashService: HashService,
        @InjectRepository(User)
        private userRepository: Repository<User>
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
        const userHash = await this.hashService.findLatestHashByUserId(userId, hash, HashType.EMAIL_CONFIRMATION);

        if (userHash !== null && userHash !== undefined) {

            if (userHash.expiration.getTime() <= new Date().getTime()) {
                return Promise.reject(new ErrorResponseDto(ErrorCodes.EXPIRED_HASH,
                                 ErrorMessages.EXPIRED_HASH));
            }

            try {
                const user = await this.userRepository.findOne({ userId });
                user.userStatus = UserStatus.ACTIVE;

                await this.userRepository.save(user);

                userHash.expiration = new Date();

                await this.hashService.saveHash(userHash);

                return;
            }
            catch {
                return Promise.reject(new ErrorResponseDto(ErrorCodes.SISTEMIC_ERROR,
                                 ErrorMessages.SISTEMIC_ERROR));
            }
        }

        return Promise.reject(new ErrorResponseDto(ErrorCodes.MISSING_HASH,
                                 ErrorMessages.MISSING_HASH));
    }

    async preRegisterUserAsync(user: User): Promise<any> {
        const userFromRepo = await this.userRepository.findOne({ email: user.email });

        if (userFromRepo !== null && userFromRepo !== undefined) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.USER_ALREADY_REGISTERED,
                                 ErrorMessages.USER_ALREADY_REGISTERED));
        }

        const salt = await this.getSalt();
        user.salt = salt;

        const hashedPassword = await this.generatePassword(user.password, salt);

        user.password = hashedPassword;
        user.userStatus = UserStatus.PENDING_EMAIL;

        await this.userRepository.insert(user);

        const confirmationEmailHash = new Hash();
        
        confirmationEmailHash.hash = this.hashService.generateHash();
        confirmationEmailHash.user = user;
        confirmationEmailHash.hashType = HashType.EMAIL_CONFIRMATION;
        confirmationEmailHash.expiration = new Date();
        confirmationEmailHash.expiration
                            .setMinutes(confirmationEmailHash.expiration.getMinutes() + 20);
        
        await this.hashService.saveHash(confirmationEmailHash);

        this.sendConfirmationEmail(user, confirmationEmailHash.hash);
    }

    async generatePassword(password: string, salt: string) {
        return await this.hash(password, salt)
    }

    async updateUser(user: User) {
        await this.userRepository.save(user);
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
