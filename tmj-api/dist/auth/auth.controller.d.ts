import { AuthService } from "src/service/auth/auth.service";
import { LoginRequestDto } from "src/shared/requests/login-request.dto";
import { Response } from 'express';
import { EmailService } from "src/service/email/email.service";
import { PasswordResetRequestDto } from "src/shared/requests/password-reset-request.dto";
import { ResetPasswordRequestDto } from "src/shared/requests/reset-password-request.dto";
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    login(loginDto: LoginRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
    requestPasswordReset(passwordResetRequest: PasswordResetRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(resetPasswordRequestDto: ResetPasswordRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
    getHello(req: any): Promise<string>;
}
