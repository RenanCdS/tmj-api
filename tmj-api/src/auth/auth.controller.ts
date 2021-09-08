import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "src/service/auth/auth.service";
import { LoginRequestDto } from "src/shared/requests/login-request.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @UseGuards(JwtAuthGuard)
  async getHello()
  {
    return 'Hello World!';
  }
}
