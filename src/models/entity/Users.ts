import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Index("modoo_users_mu_username_uindex", ["email"], { unique: true })
@Entity("modoo_users", { schema: "dev" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "mu_id" })
  id: number;

  @Column("varchar", { name: "mu_email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "mu_password", length: 255 })
  password: string;

  @Column("varchar", { name: "mu_username", length: 255 })
  username: string;

  @Column("int", { name: "mu_points", default: () => "'0'" })
  points: number;

  @Column("timestamp", {
    name: "mu_created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
