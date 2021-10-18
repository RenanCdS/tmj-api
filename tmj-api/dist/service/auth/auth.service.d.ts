import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from 'src/shared/requests/login-request.dto';
import { LoginResponseDto } from 'src/shared/responses/login-response.dto';
import { HashService } from '../hash/hash.service';
import { ResetPasswordRequestDto } from 'src/shared/requests/reset-password-request.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly hashService;
    private readonly jwtService;
    constructor(usersService: UserService, hashService: HashService, jwtService: JwtService);
    login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
    requestPasswordReset(email: string): Promise<never>;
    resetPassword(resetPasswordRequest: ResetPasswordRequestDto): Promise<never>;
}
