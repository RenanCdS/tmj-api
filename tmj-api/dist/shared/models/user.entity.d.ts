import { Genre, Role, UserStatus } from '../enum';
import { Base } from './base.entity';
import { ServiceProposed } from './service-proposed.entity';
import { ServiceRequest } from './service-request.entity';
import { UserAddress } from './user.address.entity';
import { Hash } from './hash.entity';
export declare class User extends Base {
    userId: number;
    name: string;
    cpf: string;
    phone: string;
    genre: Genre;
    role: Role;
    email: string;
    birthDate: Date;
    userStatus: UserStatus;
    password: string;
    salt: string;
    rating: number;
    userAddresses: UserAddress[];
    serviceRequestCustomer: ServiceRequest;
    serviceRequestProfessional: ServiceRequest;
    servicesProposed: ServiceProposed[];
    hashes: Hash[];
}
