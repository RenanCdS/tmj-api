import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { ServiceRequest } from "./service-request.entity";
import { UserService } from "./user-service.entity";

/**@description Serviço a ser solicitado de um cliente para um profissional */
@Entity({ name: 'tb_service' })
export class Service extends Base {

    @PrimaryGeneratedColumn()
    serviceId: number;
  
    @Column()
    name: string;

    @OneToMany(() => UserService, userService => userService.service)
    userServices: UserService[];

    @OneToMany(() => ServiceRequest, serviceRequest => serviceRequest.service)
    serviceRequests: ServiceRequest[];
}