import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

import { Book } from "./entities/book.entity";
import { Citation } from "../citations/entities/citation.entity";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly books: Repository<Book>,

    @InjectRepository(Citation)
    private readonly citations: Repository<Citation>,
  ) {}

  async all() {
    return this.books.find({
      relations: {
        author: true,
      },
    });
  }

  async search(value = "") {
    return this.books.find({
      where: {
        title: ILike(`%${value}%`),
      },
    });
  }

  async one(id: string) {
    const data = await this.books.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException("Book not found");
    }

    return {
      data,
      citation: await this.citations.find({
        where: {
          book_id: id,
        },
      }),
    };
  }

  async create(data: any) {
    const book = this.books.create(data);

    await this.books.save(book);

    return {
      message: "Added new book",
    };
  }

  async update(id: string, data: any) {
    await this.one(id);

    await this.books.update(
      { id },
      data,
    );

    return {
      message: "Updated book",
    };
  }

  async delete(id: string) {
    await this.one(id);

    await this.books.delete({
      id,
    });

    return {
      message: "Deleted book",
    };
  }
}