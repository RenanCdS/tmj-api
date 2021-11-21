import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from '../../shared/requests/login-request.dto';
import { LoginResponseDto } from '../../shared/responses/login-response.dto';
import { HashService } from '../hash/hash.service';
import { ResetPasswordRequestDto } from '../../shared/requests/reset-password-request.dto';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly usersService;
    private readonly emailService;
    private readonly configService;
    private readonly hashService;
    private readonly jwtService;
    constructor(usersService: UserService, emailService: EmailService, configService: ConfigService, hashService: HashService, jwtService: JwtService);
    login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
    requestPasswordReset(email: string): Promise<never>;
    resetPassword(resetPasswordRequest: ResetPasswordRequestDto): Promise<never>;
    private sendResetEmail;
}
