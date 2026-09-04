import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { AuthorsModule } from "./authors/authors.module";
import { BooksModule } from "./books/books.module";
import { CitationsModule } from "./citations/citations.module";
import { LikesModule } from "./likes/likes.module";

import { User } from "./auth/entities/user.entity";
import { Author } from "./authors/entities/author.entity";
import { Book } from "./books/entities/book.entity";
import { Citation } from "./citations/entities/citation.entity";
import { Like } from "./likes/entities/like.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",

      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      entities: [
        User,
        Author,
        Book,
        Citation,
        Like,
      ],

      synchronize: true,
    }),

    AuthModule,
    AuthorsModule,
    BooksModule,
    CitationsModule,
    LikesModule,
  ],
})
export class AppModule {}