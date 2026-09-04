import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CitationsController } from "./citations.controller";
import { CitationsService } from "./citations.service";


import { AuthModule } from "../auth/auth.module";
import { Citation } from "./entities/citation.entity";
import { Book } from "../books/entities/book.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Citation,
      Book,
    ]),
  ],
  controllers: [CitationsController],
  providers: [CitationsService],
})
export class CitationsModule {}