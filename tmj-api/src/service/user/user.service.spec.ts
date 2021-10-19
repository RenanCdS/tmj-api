import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryModule } from '../../repository/repository.module';
import { Address } from '../../shared/models/address.entity';
import { UserAddress } from '../../shared/models/user.address.entity';
import { User } from '../../shared/models/user.entity';
import { HashService } from '../hash/hash.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,

        {
          provide: HashService,
          useValue: () => { }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserAddress),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
      imports: [TypeOrmModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
  });
});
