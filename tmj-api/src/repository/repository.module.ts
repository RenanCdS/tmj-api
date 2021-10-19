import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../shared/models/address.entity';
import { ServiceProposed } from '../shared/models/service-proposed.entity';
import { ServiceRequest } from '../shared/models/service-request.entity';
import { UserAddress } from '../shared/models/user.address.entity';
import { User } from '../shared/models/user.entity';
import { Hash } from '../shared/models/hash.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Address,
            ServiceProposed,
            ServiceRequest,
            UserAddress,
            Hash
        ])
    ],
    exports: [TypeOrmModule]
})
export class RepositoryModule { }
