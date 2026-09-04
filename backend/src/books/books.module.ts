import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

import { Book } from "./entities/book.entity";
import { Author } from "../authors/entities/author.entity";
import { Citation } from "../citations/entities/citation.entity";

import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Book,
      Author,
      Citation,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}