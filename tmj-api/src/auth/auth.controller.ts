import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";
import { LoginRequestDto } from "src/shared/requests/login-request.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';
import { EmailService } from "src/service/email/email.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
            private readonly emailService: EmailService) {}

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginRequestDto, @Res() response: Response) {
    try {
      const token = await this.authService.login(loginDto);
      return response.status(HttpStatus.OK).json(token);
    }
    catch (err){
      return response.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Get('hello-world')
  // @UseGuards(JwtAuthGuard)
  async getHello()
  {
    this.emailService.sendEmail();
    return 'Hello World!';
  }
}
