import { Base } from "./base.entity";
import { ServiceRequest } from "./service-request.entity";
import { User } from "./user.entity";
export declare class ServiceProposed extends Base {
    serviceProposedId: number;
    priceOffer: number;
    comments: string;
    professional: User;
    serviceRequest: ServiceRequest;
}
