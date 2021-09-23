import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { CustomerServiceController } from './customer-service.controller';

@Module({
    controllers: [CustomerServiceController],
    imports: [ServiceModule]
})
export class CustomerServiceModule {}
