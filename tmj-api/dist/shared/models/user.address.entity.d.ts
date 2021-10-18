import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";
export declare class UserAddress extends Base {
    userAddressId: number;
    user: User;
    userId: number;
    addressId: number;
    address: Address;
}
