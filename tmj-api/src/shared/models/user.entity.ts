import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role, UserStatus } from '../enum';
import { Base } from './base.entity';
import { ServiceProposedComment } from './service-proposed-comment.entity';
import { ServiceProposed } from './service-proposed.entity';
import { ServiceRequest } from './service-request.entity';
import { UserService } from './user-service.entity';
import { UserAddress } from './user.address.entity';
import { Notification } from './notification.entity';
import { Hash } from './hash.entity';

@Entity({ name: 'tb_user' })
export class User extends Base {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  role: Role;

  @Column()
  email: string;

  @Column({ default: UserStatus.ACTIVE })
  userStatus: UserStatus;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => UserService, userService => userService.user)
  userServices: UserService[];

  @OneToMany(() => UserAddress, userAddress => userAddress.user)
  userAddresses: UserAddress[];

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.customer)
  serviceRequestCustomer: ServiceRequest;

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.professional)
  serviceRequestProfessional: ServiceRequest;

  @OneToMany(() => ServiceProposed, serviceProposed => serviceProposed.professional)
  servicesProposed: ServiceProposed[];

  @OneToMany(() => ServiceProposedComment, serviceProposedComment => serviceProposedComment.user)
  serviceProposedComments: ServiceProposedComment[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => Hash, hash => hash.user)
  hashes: Hash[];
}