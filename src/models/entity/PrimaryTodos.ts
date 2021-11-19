import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_primary_todos_mpt_id_uindex", ["mptId"], { unique: true })
@Entity("modoo_primary_todos", { schema: "dev" })
export class PrimaryTodos extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mpt_id" })
  mptId: number;

  @Column("int", { primary: true, name: "mpt_mu_id" })
  mptMuId: number;

  @Column("varchar", { name: "mpt_title", length: 255 })
  mptTitle: string;

  @Column("timestamp", {
    name: "mpt_period",
    default: () => "CURRENT_TIMESTAMP",
  })
  mptPeriod: Date;

  @Column("timestamp", {
    name: "mpt_created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  mptCreatedAt: Date | null;
}
