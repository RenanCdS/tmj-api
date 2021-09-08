import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/shared/models/address.entity';
import { ServiceProposedComment } from 'src/shared/models/service-proposed-comment.entity';
import { ServiceProposed } from 'src/shared/models/service-proposed.entity';
import { ServiceRequest } from 'src/shared/models/service-request.entity';
import { Service } from 'src/shared/models/service.entity';
import { UserService } from 'src/shared/models/user-service.entity';
import { UserAddress } from 'src/shared/models/user.address.entity';
import { User } from 'src/shared/models/user.entity';
import { Notification } from 'src/shared/models/notification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
                User,
                Address,
                Notification,
                ServiceProposed,
                ServiceProposedComment,
                ServiceRequest,
                Service,
                UserService,
                UserAddress,
        ])
    ],
    exports: [TypeOrmModule]
})
export class RepositoryModule {}
