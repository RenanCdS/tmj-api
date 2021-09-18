import { Module } from '@nestjs/common';
import { CustomerServiceController } from './customer-service.controller';

@Module({
    controllers: [CustomerServiceController]
})
export class CustomerServiceModule {}
