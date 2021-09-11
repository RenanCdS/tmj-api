import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";
import { LoginRequestDto } from "src/shared/requests/login-request.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';
import { EmailService } from "src/service/email/email.service";
import { PasswordResetRequestDto } from "src/shared/requests/password-reset-request.dto";
import { ResetPasswordRequestDto } from "src/shared/requests/reset-password-request.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "src/shared/responses/login-response.dto";

@ApiTags('auth')
@Controller('/v1')
export class AuthController {
  constructor(private readonly authService: AuthService,
            private readonly emailService: EmailService) {}

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginResponseDto
  })
  async login(@Body() loginDto: LoginRequestDto, @Res() response: Response) {
    try {
      const token = await this.authService.login(loginDto);
      return response.status(HttpStatus.OK).json(token);
    }
    catch (err){
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Post('auth/password-reset')
  @ApiCreatedResponse({
    description: 'Envia o e-mail de reset de senha para o usuário'
  })
  async requestPasswordReset(@Body() passwordResetRequest: PasswordResetRequestDto, @Res() response: Response) {
    try {
      await this.authService.requestPasswordReset(passwordResetRequest.email);
      return response.status(HttpStatus.CREATED).json();
    }
    catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }

  @Patch('auth/password-reset')
  @ApiOkResponse({
    description: 'Realiza a troca de senha'
  })
  async resetPassword(@Body() resetPasswordRequestDto: ResetPasswordRequestDto, @Res() response: Response) {
    try {
      await this.authService.resetPassword(resetPasswordRequestDto);
      return response.status(HttpStatus.OK).json();
    }
    catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Get('hello-world')
  @UseGuards(JwtAuthGuard)
  async getHello()
  {
    this.emailService.sendEmail();
    return 'Hello World!';
  }
}
