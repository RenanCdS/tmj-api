import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";

@Entity({ name: 'tb_email' })
export class Email extends Base {

    @PrimaryGeneratedColumn()
    emailId: number;

    @Column({
        type: 'text'
    })
    htmlTemplate: string;
}