import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Email } from '../../shared/models/email.entity';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService,

        {
          provide: getRepositoryToken(Email),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
  });
});
