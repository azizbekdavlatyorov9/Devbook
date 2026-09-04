import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { Type } from 'class-transformer';
import { AuthorPeriod } from '../../authors/entities/author.entity';
import { BookGenre } from '../entities/book.entity';


export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message:
      "Kitob nomi kamida 3 ta belgidan iborat bo'lishi kerak",
  })
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsEnum(AuthorPeriod, {
    message:
      'Bunday davr qiymati mavjud emas',
  })
  period?: AuthorPeriod;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  published_year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000)
  pages?: number;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsEnum(BookGenre, {
    message:
      'Bunday janr qiymati mavjud emas',
  })
  genres?: BookGenre;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  author_info?: number;
}