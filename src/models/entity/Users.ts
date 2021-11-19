import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_users_mu_username_uindex", ["muUsername"], { unique: true })
@Entity("modoo_users", { schema: "dev" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mu_id" })
  muId: number;

  @Column("varchar", { name: "mu_username", unique: true, length: 255 })
  muUsername: string;

  @Column("varchar", { name: "mu_password", length: 255 })
  muPassword: string;

  @Column("varchar", { name: "mu_name", length: 255 })
  muName: string;

  @Column("int", { name: "mu_points", default: () => "'0'" })
  muPoints: number;

  @Column("timestamp", {
    name: "mu_created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  muCreatedAt: Date | null;
}
