import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";
import { AuthModule } from "../auth/auth.module";
import { Author } from "./entities/author.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}