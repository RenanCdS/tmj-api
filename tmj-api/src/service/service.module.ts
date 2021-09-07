import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

const services = [UserService, AuthService];

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
