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

import { Author } from "../../authors/entities/author.entity";
import { Citation } from "../../citations/entities/citation.entity";

export enum BookGenre {
  FANTASTIK = "fantastik",
  BADIY = "badiiy",
  DRAMA = "drama",
  MELODRAMA = "melodrama",
  DETEKTIV = "detektiv",
  SARGUZASHT = "sarguzasht",
  TARIXIY = "tarixiy",
  ILMIY_FANTASTIK = "ilmiy-fantastik",
}

export const GENRES = Object.values(BookGenre);


export const PERIODS = [
  "Temuriylar davri",
  "Jadid davri",
  "Sovet davri",
  "Mustaqillik davri",
] as const;

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  period!: string;

  @Column()
  published_year!: number;

  @Column()
  pages!: number;

  @Column()
  publisher!: string;

  @Column()
  genres!: string;

  @Column({ type: "text" })
  details!: string;

  @Column({ name: "author_id" })
  author_id!: string;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author!: Author;

  @OneToMany(() => Citation, (citation) => citation.book)
  citations!: Citation[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}