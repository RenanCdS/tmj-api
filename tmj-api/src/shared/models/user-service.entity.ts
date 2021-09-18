import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UsingJoinTableIsNotAllowedError } from "typeorm";
import { Base } from "./base.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_user_service' })
export class UserService extends Base  {

    @PrimaryGeneratedColumn()
    userServiceId: number;
  
    @Column()
    userId: string;

    @Column()
    serviceId: string;

    @ManyToOne(() => User, user => user.userServices)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Service, service => service.userServices)
    @JoinColumn({ name: 'serviceId' })
    service: Service;
}