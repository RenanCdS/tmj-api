import { Column } from "typeorm";

export class Base {
  @Column({ type: 'datetime', default: () => 'NOW()' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  updatedAt: Date;

  /** @description Identifies if this register is deleted or not in the database */
  @Column({ default: true })
  isActive: boolean;
}