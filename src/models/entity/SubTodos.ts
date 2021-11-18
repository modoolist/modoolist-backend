import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("modoo_sub_todos")
export class SubTodos extends BaseEntity {
  @PrimaryGeneratedColumn()
  mst_id: number;

  @Column()
  mst_mpt_id: number;

  @Column()
  mst_title: string;

  @Column()
  mst_isAchived: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  mpt_created_at: Date;
}
