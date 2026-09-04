import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { Citation } from "../../citations/entities/citation.entity";


@Entity("likes")
@Unique(["user_id", "citation_id"])
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user!: User;

  @ManyToOne(
    () => Citation,
    (citation) => citation.likes,
    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({
    name: "citation_id",
  })
  citation!: Citation;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ name: "user_id" })
  user_id!: string;

  @Column({ name: "citation_id" })
  citation_id!: string;
}