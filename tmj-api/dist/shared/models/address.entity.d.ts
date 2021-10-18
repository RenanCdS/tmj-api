import { Base } from "./base.entity";
import { UserAddress } from "./user.address.entity";
export declare class Address extends Base {
    addressId: number;
    name: string;
    postalCode: string;
    city: string;
    number: number;
    district: string;
    state: string;
    latitude: string;
    longitude: string;
    default: boolean;
    userAddress: UserAddress;
}
