import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { AuthorsModule } from "./authors/authors.module";
import { BooksModule } from "./books/books.module";
import { CitationsModule } from "./citations/citations.module";
import { LikesModule } from "./likes/likes.module";

import { User } from "./auth/entities/user.entity";
import { Book } from "./books/entities/book.entity";
import { Author } from "./authors/entities/author.entity";
import { Citation } from "./citations/entities/citation.entity";
import { Like } from "./likes/entities/like.entity";

@Module({
  imports: [
    // .env fayldagi o'zgaruvchilarni yuklash
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // PostgreSQL ulanishi
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: "postgres",

        host: configService.get<string>("DB_HOST"),

        port: configService.get<number>("DB_PORT"),

        username: configService.get<string>("DB_USERNAME"),

        password: configService.get<string>("DB_PASSWORD"),

        database: configService.get<string>("DB_DATABASE"),

        entities: [
          User,
          Author,
          Book,
          Citation,
          Like,
        ],

        synchronize: true,
      }),
    }),

    // Application modules
    AuthModule,
    AuthorsModule,
    BooksModule,
    CitationsModule,
    LikesModule,
  ],
})
export class AppModule {}