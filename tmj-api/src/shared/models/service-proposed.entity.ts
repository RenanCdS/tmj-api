import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { ServiceRequest } from "./service-request.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_service_proposed'})
export class ServiceProposed extends Base {
    @PrimaryGeneratedColumn()
    serviceProposedId: number;

    @Column()
    priceOffer: number;

    @Column()
    comments: string;

    @ManyToOne(() => User, user => user.servicesProposed)
    @JoinColumn({ name: 'professionalId' })
    professional: User;

    @ManyToOne(() => ServiceRequest, serviceRequest => serviceRequest.servicesProposed)
    @JoinColumn({ name: 'serviceRequestId' })
    serviceRequest: ServiceRequest;
}