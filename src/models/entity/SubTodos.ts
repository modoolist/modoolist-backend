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
  duedate: Date;

  @Column("tinyint", { name: "mst_isAchieved", width: 1, default: () => "'0'" })
  isAchieved: boolean;

  @Column("timestamp", {
    name: "mst_created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  static countAchievedTasks(startsAt: string, endsAt: string, userId: number) {
    return this.createQueryBuilder()
      .select("mst_duedate as duedate")
      .addSelect(`COUNT(case when mst_mu_id = ${userId} then 1 end) as total`)
      .addSelect(
        `COUNT(case when mst_mu_id = ${userId} and mst_isAchieved = true then 1 end) as achieved`
      )
      .where(`mst_duedate BETWEEN '${startsAt}' AND '${endsAt}'`)
      .groupBy("mst_duedate")
      .getRawMany();
  }
}
