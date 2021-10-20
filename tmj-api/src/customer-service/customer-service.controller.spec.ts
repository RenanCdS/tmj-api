import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceRequestService } from '../service/service-request/service-request.service';
import { CustomerServiceController } from './customer-service.controller';

describe('CustomerServiceController', () => {
  let controller: CustomerServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerServiceController],
      providers: [
        {
          provide: ServiceRequestService,
          useValue: () => { }
        },
        {
          provide: JwtAuthGuard,
          useValue: () => { }
        }
      ]
    }).compile();

    controller = module.get<CustomerServiceController>(CustomerServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
