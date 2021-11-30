import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_sub_todos_mst_id_uindex", ["id"], { unique: true })
@Entity("modoo_sub_todos", { schema: "dev" })
export class SubTodos extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mst_id" })
  id: number;

  @Column("int", { primary: true, name: "mst_mu_id" })
  muId: number;

  @Column("int", { primary: true, name: "mst_mpt_id" })
  mptId: number;

  @Column("varchar", { name: "mst_title", length: 255 })
  title: string;

  @Column("date", {
    name: "mst_duedate",
    default: () => "CURDATE",
  })
  period: Date;

  @Column("tinyint", { name: "mst_isAchieved", width: 1, default: () => "'0'" })
  isAchieved: boolean;

  @Column("timestamp", {
    name: "mst_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
