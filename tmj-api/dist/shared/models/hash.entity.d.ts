import { HashType } from "../enum";
import { Base } from "./base.entity";
import { User } from "./user.entity";
export declare class Hash extends Base {
    hashId: number;
    user: User;
    userId: number;
    hash: string;
    hashType: HashType;
    expiration: Date;
}
