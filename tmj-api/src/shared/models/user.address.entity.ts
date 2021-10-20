import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_user_address' })
export class UserAddress extends Base {
    @PrimaryGeneratedColumn()
    userAddressId: number;

    @ManyToOne(() => User, user => user.userAddresses)
    @JoinColumn({ name: 'serviceId' })
    user: User;

    @Column()
    userId: number;

    @Column()
    addressId: number;

    @OneToOne(() => Address, address => address.userAddress)
    address: Address;
}