import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { ServiceProposed } from "./service-proposed.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_service_proposed_comment' })
export class ServiceProposedComment extends Base {

    @PrimaryGeneratedColumn()
    commentId: number;

    @ManyToOne(() => ServiceProposed, serviceProposed => serviceProposed.serviceProposedComments)
    @JoinColumn({ name: 'serviceProposedId' })
    serviceProposed: ServiceProposed;

    @ManyToOne(() => User, user => user.serviceProposedComments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    comment: string;
}