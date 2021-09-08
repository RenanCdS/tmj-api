import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from 'src/shared/requests/login-request.dto';
import { LoginResponseDto } from 'src/shared/responses/login-response.dto';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService) {}

    async login(loginDto: LoginRequestDto) : Promise<LoginResponseDto>
    {
        const userFromRepo = await this.usersService.getUserByEmail(loginDto.email);

        if (userFromRepo === null || userFromRepo === undefined) {
            return Promise.reject(new ErrorResponseDto(100, 'usuário ou senha inválidos.'));
        }

        if (!userFromRepo.isEmailConfirmed) {
            return Promise.reject(new ErrorResponseDto(101, 'confirmação de e-mail pendente.'));
        }

        if (!userFromRepo.isUserActive) {
            return Promise.reject(new ErrorResponseDto(102, 'usuário está bloqueado.'));
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, userFromRepo.password);

        if (isPasswordValid) {
            const payload = { username: userFromRepo.email, sub: userFromRepo.userId, role: userFromRepo.role };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }

        return Promise.reject(new ErrorResponseDto(100, 'usuário ou senha inválidos.'));
    }
}
