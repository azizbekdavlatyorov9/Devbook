import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "../../books/entities/book.entity";
import { Like } from "../../likes/entities/like.entity";


@Entity("citations")
export class Citation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  body!: string;

  @Column({ name: "book_id" })
  book_id!: string;

  @ManyToOne(
    () => Book,
    (book) => book.citations,
    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({
    name: "book_id",
  })
  book!: Book;

  @OneToMany(
    () => Like,
    (like) => like.citation,
  )
  likes!: Like[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}