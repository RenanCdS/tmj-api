import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/shared/models/address.entity';
import { ServiceProposed } from 'src/shared/models/service-proposed.entity';
import { ServiceRequest } from 'src/shared/models/service-request.entity';
import { UserAddress } from 'src/shared/models/user.address.entity';
import { User } from 'src/shared/models/user.entity';
import { Hash } from 'src/shared/models/hash.entity';

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
export class RepositoryModule {}
