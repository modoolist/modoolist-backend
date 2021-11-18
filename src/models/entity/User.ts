import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("modoo_users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  mu_id: number;

  @Column({ unique: true })
  mu_username: string;

  @Column()
  mu_password: string;

  @Column()
  mu_name: string;

  @Column()
  mu_points: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  mu_created_at: Date;
}
