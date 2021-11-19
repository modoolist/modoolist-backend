import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_sub_todos_mst_id_uindex", ["mstId"], { unique: true })
@Entity("modoo_sub_todos", { schema: "dev" })
export class SubTodos extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mst_id" })
  mstId: number;

  @Column("int", { primary: true, name: "mst_mpt_id" })
  mstMptId: number;

  @Column("varchar", { name: "mst_title", length: 255 })
  mstTitle: string;

  @Column("tinyint", { name: "mst_isAchieved", width: 1, default: () => "'0'" })
  mstIsAchieved: boolean;

  @Column("timestamp", {
    name: "mst_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  mstCreatedAt: Date;
}
