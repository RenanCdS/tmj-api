import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    return await this.authService.login(loginDto);
  }

  @Get('hello-world')
  @UseGuards(JwtAuthGuard)
  async getHello()
  {
    return 'Hello World!';
  }
}
