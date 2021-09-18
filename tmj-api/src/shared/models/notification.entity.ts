import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { ServiceRequest } from "./service-request.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_notification' })
export class Notification extends Base {
    @PrimaryGeneratedColumn()
    notificationId: number;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => ServiceRequest, serviceRequest => serviceRequest.notifications)
    @JoinColumn({ name: 'serviceRequestId' })
    serviceRequest: ServiceRequest;

    @Column()
    type: string;

    @Column()
    description: string;
}