import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_primary_todos_mpt_id_uindex", ["id"], { unique: true })
@Entity("modoo_primary_todos", { schema: "dev" })
export class PrimaryTodos extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mpt_id" })
  id: number;

  @Column("int", { primary: true, name: "mpt_mu_id" })
  muId: number;

  @Column("varchar", { name: "mpt_title", length: 255 })
  title: string;

  @Column("date", {
    name: "mpt_period",
    default: () => "CURDATE",
  })
  period: Date;

  @Column("timestamp", {
    name: "mpt_created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
