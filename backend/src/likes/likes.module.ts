import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";


import { AuthModule } from "../auth/auth.module";
import { Like } from "./entities/like.entity";
import { Citation } from "../citations/entities/citation.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Like,
      Citation,
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}