import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";

import {
  IsIn,
  IsInt,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

import { BooksService } from "./books.service";

import { AdminGuard } from "../auth/roles.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

import { GENRES, PERIODS } from "./entities/book.entity";

class BookDto {
  @IsString()
  title!: string;

  @IsIn(PERIODS)
  period!: string;

  @IsInt()
  @Min(0)
  published_year!: number;

  @IsInt()
  @Min(1)
  @Max(10000)
  pages!: number;

  @IsString()
  publisher!: string;

  @IsIn(GENRES)
  genres!: string;

  @IsString()
  details!: string;

  @IsUUID()
  author_id!: string;
}

@UseGuards(JwtAuthGuard)
@Controller()
export class BooksController {
  constructor(
    private readonly books: BooksService,
  ) {}

  @Get("get_all_books")
  all() {
    return this.books.all();
  }

  @Get("book_search")
  search(
    @Query("searchingvalue") value?: string,
  ) {
    return this.books.search(value);
  }

  @Get("get_one_book/:id")
  one(
    @Param("id") id: string,
  ) {
    return this.books.one(id);
  }

  @UseGuards(AdminGuard)
  @Post("add_book")
  create(
    @Body() body: BookDto,
  ) {
    return this.books.create(body);
  }

  @UseGuards(AdminGuard)
  @Put("update_book/:id")
  update(
    @Param("id") id: string,
    @Body() body: BookDto,
  ) {
    return this.books.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete("delete_book/:id")
  delete(
    @Param("id") id: string,
  ) {
    return this.books.delete(id);
  }
}