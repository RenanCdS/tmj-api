import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceRequestStatus } from "../enum";
import { Base } from "./base.entity";
import { ServiceProposed } from "./service-proposed.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_service_request' })
export class ServiceRequest extends Base {

    constructor(serviceName: string, serviceDescription: string, comments: string, image: string) {
        super();
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.comments = comments;
        this.image = image;
    }
     
    @PrimaryGeneratedColumn()
    serviceRequestId: number;

    @Column()
    serviceName: string;

    @Column()
    serviceDescription: string;

    @Column({ default: ServiceRequestStatus.ACTIVE })
    status: ServiceRequestStatus;

    @Column()
    comments: string;

    @Column()
    image: string;

    @Column({ default: 0 })
    finalPrice: number;

    @Column()
    customerId: number;

    @ManyToOne(() => User, user => user.serviceRequestCustomer)
    @JoinColumn({ name: "customerId" })
    customer: User;

    @ManyToOne(() => User, user => user.serviceRequestProfessional)
    @JoinColumn({ name: "professionalId" })
    professional: User;

    @OneToMany(() => ServiceProposed, serviceProposed => serviceProposed.serviceRequest)
    servicesProposed: ServiceProposed[];

    addCustomerId(customerId: number): void {
        this.customerId = customerId;
    }
}