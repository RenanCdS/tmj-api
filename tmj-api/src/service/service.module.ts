import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { EmailService } from './email/email.service';
import { HashService } from './hash/hash.service';
import { ServiceRequestService } from './service-request/service-request.service';

const services = [UserService, AuthService, EmailService, HashService, ServiceRequestService];

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [...services],
  exports: [...services]
})
export class ServiceModule {}
