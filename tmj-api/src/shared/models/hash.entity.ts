import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HashType } from "../enum";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_hash' })
export class Hash extends Base {

    @PrimaryGeneratedColumn()
    hashId: number;

    @ManyToOne(() => User, user => user.serviceProposedComments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @Column()
    hash: string;

    @Column({ default: HashType.PASSWORD_RESET })
    hashType: HashType;

    @Column()
    expiration: Date;
}