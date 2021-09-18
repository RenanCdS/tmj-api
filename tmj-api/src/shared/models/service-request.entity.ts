import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceRequestStatus } from "../enum";
import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { ServiceProposed } from "./service-proposed.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";
import { Notification } from "./notification.entity";

@Entity({ name: 'tb_service_request' })
export class ServiceRequest extends Base {

    @PrimaryGeneratedColumn()
    serviceRequestId: number;

    @Column()
    description: string;

    @Column()
    status: ServiceRequestStatus;

    @Column()
    comments: string;

    @Column()
    expectedPrice: number;

    @Column()
    finalPrice: number;

    @Column()
    customerRating: number;

    @Column()
    professionalRating: number;

    @ManyToOne(() => User, user => user.serviceRequestCustomer)
    @JoinColumn({ name: "customerId" })
    customer: User;

    @ManyToOne(() => User, user => user.serviceRequestProfessional)
    @JoinColumn({ name: "professionalId" })
    professional: User;

    @OneToOne(() => Address, address => address.addressId)
    address: Address;

    @ManyToOne(() => Service, service => service.serviceRequests)
    @JoinColumn({ name: "serviceId" })
    service: Service;

    @OneToMany(() => ServiceProposed, serviceProposed => serviceProposed.serviceRequest)
    servicesProposed: ServiceProposed[];

    @OneToMany(() => Notification, notification => notification.serviceRequest)
    notifications: Notification[];
}