import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Genre, Role, UserStatus } from '../enum';
import { Base } from './base.entity';
import { ServiceProposed } from './service-proposed.entity';
import { ServiceRequest } from './service-request.entity';
import { UserAddress } from './user.address.entity';
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
  genre: Genre;

  @Column()
  role: Role;

  @Column()
  email: string;

  @Column()
  birthDate: Date;

  @Column({ default: UserStatus.ACTIVE })
  userStatus: UserStatus;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => UserAddress, userAddress => userAddress.user)
  userAddresses: UserAddress[];

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.customer)
  serviceRequestCustomer: ServiceRequest;

  @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.professional)
  serviceRequestProfessional: ServiceRequest;

  @OneToMany(() => ServiceProposed, serviceProposed => serviceProposed.professional)
  servicesProposed: ServiceProposed[];

  @OneToMany(() => Hash, hash => hash.user)
  hashes: Hash[];
}