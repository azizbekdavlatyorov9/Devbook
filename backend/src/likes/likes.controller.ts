import {
  Controller,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LikesService } from "./likes.service";

@UseGuards(JwtAuthGuard)
@Controller()
export class LikesController {
  constructor(
    private readonly likes: LikesService,
  ) {}

  @Patch("like/:id")
  toggle(
    @Param("id") id: string,
    @Req() req: any,
  ) {
    return this.likes.toggle(
      req.user.id,
      id,
    );
  }
}