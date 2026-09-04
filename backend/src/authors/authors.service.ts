import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";

import { Author } from "./entities/author.entity";

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authors: Repository<Author>,
  ) {}

  async all() {
    return this.authors.find();
  }

  async search(value = "") {
    return this.authors.find({
      where: {
        full_name: ILike(`%${value}%`),
      },
    });
  }

  async one(id: string) {
    const author = await this.authors.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException("Author not found");
    }

    return author;
  }

  async create(
    data: any,
    filename: string,
    baseUrl: string,
  ) {
    const author = this.authors.create({
      ...data,
      picture: `${baseUrl}/uploads/${filename}`,
    });

    await this.authors.save(author);

    return {
      message: "Added new author",
    };
  }

  async update(id: string, data: any) {
    await this.one(id);

    await this.authors.update(
      { id },
      data,
    );

    return {
      message: "Updated author",
    };
  }

  async delete(id: string) {
    await this.one(id);

    await this.authors.delete({ id });

    return {
      message: "Deleted author",
    };
  }
}