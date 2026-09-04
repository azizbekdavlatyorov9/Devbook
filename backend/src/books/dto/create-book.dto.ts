import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { Type } from 'class-transformer';
import { AuthorPeriod } from '../../authors/entities/author.entity';
import { BookGenre } from '../entities/book.entity';


export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message:
      "Kitob nomi kamida 3 ta belgidan iborat bo'lishi kerak",
  })
  @MaxLength(150)
  title!: string;

  @IsEnum(AuthorPeriod, {
    message:
      'Bunday davr qiymati mavjud emas',
  })
  period!: AuthorPeriod;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  published_year!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000)
  pages!: number;

  @IsString()
  @IsNotEmpty()
  publisher!: string;

  @IsEnum(BookGenre, {
    message:
      'Bunday janr qiymati mavjud emas',
  })
  genres!: BookGenre;

  @IsString()
  @IsNotEmpty()
  details!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  author_info!: number;
}