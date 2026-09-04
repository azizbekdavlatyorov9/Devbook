import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import {
  IsString,
  IsUUID,
} from "class-validator";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/roles.guard";
import { CitationsService } from "./citations.service";

class CitationDto {
  @IsString()
  body!: string;

  @IsUUID()
  book_id!: string;
}

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller()
export class CitationsController {
  constructor(
    private readonly citations: CitationsService,
  ) {}

  @Post("add_citation")
  create(@Body() body: CitationDto) {
    return this.citations.create(body);
  }

  @Put("update_citation/:id")
  update(
    @Param("id") id: string,
    @Body() body: CitationDto,
  ) {
    return this.citations.update(id, body);
  }

  @Delete("delete_citation/:id")
  delete(
    @Param("id") id: string,
  ) {
    return this.citations.delete(id);
  }
}