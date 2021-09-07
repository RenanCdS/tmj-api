import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { UserAddress } from "./user.address.entity";

@Entity({ name: 'tb_address' })
export class Address extends Base {

    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    name: string;

    @Column()
    postalCode: string;

    @Column()
    address: string;

    @Column()
    number: number;

    @Column()
    district: string;

    @Column()
    state: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column({ default: true })
    default: boolean;

    @OneToOne(() => UserAddress, userAddress => userAddress.address)
    userAddress: UserAddress;
}