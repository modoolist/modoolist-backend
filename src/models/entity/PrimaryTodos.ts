import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("modoo_primary_todos")
export class PrimaryTodos extends BaseEntity {
  @PrimaryGeneratedColumn()
  mpt_id: number;

  @Column()
  mpt_mu_id: number;

  @Column()
  mpt_title: string;

  @Column({ type: "timestamp" })
  mpt_period: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  mpt_created_at: Date;
}
