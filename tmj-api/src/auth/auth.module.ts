import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ServiceModule } from 'src/service/service.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule, ServiceModule],
  controllers: [AuthController],
  providers: [JwtStrategy]
})
export class AuthModule {}
