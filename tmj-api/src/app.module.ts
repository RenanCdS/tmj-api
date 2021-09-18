import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ServiceModule } from './service/service.module';
import { CustomerServiceModule } from './customer-service/customer-service.module';
import { ProposalModule } from './proposal/proposal.module';

@Module({
  imports: [
      AuthModule,
      UsersModule,
      RepositoryModule,
      ConfigModule.forRoot({
          envFilePath: ['.env.development.local', '.env.development'],
          isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
        useFactory: async () =>
          Object.assign(await getConnectionOptions(), {
            autoLoadEntities: true,
          }), 
      }),
      ServiceModule,
      CustomerServiceModule,
      ProposalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
