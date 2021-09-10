import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from 'src/shared/requests/login-request.dto';
import { LoginResponseDto } from 'src/shared/responses/login-response.dto';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import { ErrorCodes, ErrorMessages, HashType, UserStatus } from 'src/shared/enum';
import { HashService } from '../hash/hash.service';
import { Hash } from 'src/shared/models/hash.entity';
import { ResetPasswordRequestDto } from 'src/shared/requests/reset-password-request.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService,
                private readonly hashService: HashService,
                private readonly jwtService: JwtService) {}

    async login(loginDto: LoginRequestDto) : Promise<LoginResponseDto>
    {
        const userFromRepo = await this.usersService.getUserByEmail(loginDto.email);

        if (userFromRepo === null || userFromRepo === undefined) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.USER_OR_PASSWORD_INVALID,
                                 ErrorMessages.USER_OR_PASSWORD_INVALID));
        }

        if (userFromRepo.userStatus === UserStatus.PENDING_EMAIL) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.PENDING_EMAIL,
                                 ErrorMessages.PENDING_EMAIL));
        }

        if (userFromRepo.userStatus === UserStatus.BLOCKED) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.BLOCKED_USER,
                                 ErrorMessages.BLOCKED_USER));
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, userFromRepo.password);

        if (isPasswordValid) {
            const payload = { username: userFromRepo.email, sub: userFromRepo.userId, role: userFromRepo.role };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }

        return Promise.reject(new ErrorResponseDto(ErrorCodes.USER_OR_PASSWORD_INVALID,
                                 ErrorMessages.USER_OR_PASSWORD_INVALID));
    }

    async requestPasswordReset(email: string) {
        try {
            const user = await this.usersService.getUserByEmail(email);
            if (user === null || user === undefined) return;

            const hashToInsert = new Hash();
            hashToInsert.user = user;
            hashToInsert.hashType = HashType.PASSWORD_RESET;
            hashToInsert.expiration = new Date();
            hashToInsert.expiration
                                .setMinutes(hashToInsert.expiration.getMinutes() + 20);
            hashToInsert.hash = this.hashService.generateHash();

            await this.hashService.saveHash(hashToInsert);

            // TODO: enviar e-mail com o hash para o usuário
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async resetPassword(resetPasswordRequest: ResetPasswordRequestDto) {
        const hash = await this.hashService.findHash(resetPasswordRequest.hash);

        if (hash === null || hash === undefined) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.MISSING_HASH, ErrorMessages.MISSING_HASH));
        }

        if (hash.expiration.getTime() <= new Date().getTime()) {
                return Promise.reject(new ErrorResponseDto(ErrorCodes.EXPIRED_HASH,
                                 ErrorMessages.EXPIRED_HASH));
        }

        try {
            const user = await this.usersService.getUserByEmail(hash.user.email);

            user.password = await this.usersService.generatePassword(resetPasswordRequest.password, user.salt);

            await this.usersService.updateUser(user);
            await this.hashService.invalidateHash(hash);
        }
        catch(err) {
            return Promise.reject(err);
        }
        // TODO: enviar e-mail informando que password foi alterado
    }
}
