import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum';
import { Base } from './base.entity';

@Entity({ name: 'tb_user' })
export class User extends Base {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  role: Role;

  @Column()
  email: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  rating: number;

  /** @description Identifies if the user is active */
  @Column({ default: false })
  isUserActive: boolean;
}