import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { AuthorsService } from "./authors.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdminGuard } from "../auth/roles.guard";
import { PERIODS } from "./entities/author.entity";
class AuthorDto {
  @IsString() @IsNotEmpty() full_name!: string;
  @IsInt() @Min(0) birth_year!: number;
  @IsInt() @Min(0) death_year!: number;
  @IsString() bio!: string;
  @IsIn(PERIODS) period!: string;
  @IsString() work!: string;
  @IsString() region!: string;
}
const imageStorage = diskStorage({
  destination: "uploads/images",
  filename: (_r, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`,
    ),
});
@UseGuards(JwtAuthGuard)
@Controller()
export class AuthorsController {
  constructor(private authors: AuthorsService) {}
  @Get("get_all_authors") all() {
    return this.authors.all();
  }
  @Get("author_search") search(@Query("searchingvalue") value?: string) {
    return this.authors.search(value);
  }
  @Get("get_one_author/:id") one(@Param("id") id: string) {
    return this.authors.one(id);
  }
  @UseGuards(AdminGuard)
  @Post("add_author")
  @UseInterceptors(
    FileInterceptor("upload_image", {
      storage: imageStorage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_r, f, cb) =>
        cb(
          null,
          ["image/png", "image/jpeg", "image/webp"].includes(f.mimetype),
        ),
    }),
  )
  create(
    @Body() body: AuthorDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file) throw new BadRequestException("Image is required");
    return this.authors.create(
      body,
      file.filename,
      `${req.protocol}://${req.get("host")}`,
    );
  }
  @UseGuards(AdminGuard) @Put("update_author/:id") update(
    @Param("id") id: string,
    @Body() body: AuthorDto,
  ) {
    return this.authors.update(id, body);
  }
  @UseGuards(AdminGuard) @Delete("delete_author/:id") delete(
    @Param("id") id: string,
  ) {
    return this.authors.delete(id);
  }
}
