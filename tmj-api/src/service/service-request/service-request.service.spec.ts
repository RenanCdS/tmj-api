import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceRequest } from '../../shared/models/service-request.entity';
import { User } from '../../shared/models/user.entity';
import { ServiceRequestService } from './service-request.service';

describe('ServiceRequestService', () => {
  let service: ServiceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRequestService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ServiceRequest),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
      imports: []
    }).compile();

    service = module.get<ServiceRequestService>(ServiceRequestService);
  });

  it('should be defined', () => {
  });
});
