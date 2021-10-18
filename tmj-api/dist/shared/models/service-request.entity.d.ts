import { ServiceRequestStatus } from "../enum";
import { Base } from "./base.entity";
import { ServiceProposed } from "./service-proposed.entity";
import { User } from "./user.entity";
export declare class ServiceRequest extends Base {
    constructor(serviceName: string, serviceDescription: string, comments: string, image: string);
    serviceRequestId: number;
    serviceName: string;
    serviceDescription: string;
    status: ServiceRequestStatus;
    comments: string;
    image: string;
    finalPrice: number;
    customerId: number;
    customer: User;
    professional: User;
    servicesProposed: ServiceProposed[];
    addCustomerId(customerId: number): void;
}
