import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "../../books/entities/book.entity";

export enum AuthorPeriod {
  TEMURIYLAR = "Temuriylar davri",
  JADID = "Jadid davri",
  SOVET = "Sovet davri",
  MUSTAQILLIK = "Mustaqillik davri",
}

export const PERIODS = Object.values(AuthorPeriod);

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  full_name!: string;

  @Column()
  birth_year!: number;

  @Column()
  death_year!: number;

  @Column({ type: "text" })
  bio!: string;

  @Column()
  period!: string;

  @Column({ type: "text" })
  work!: string;

  @Column()
  region!: string;

  @Column()
  picture!: string;

  @OneToMany(() => Book, (book) => book.author)
  books!: Book[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}