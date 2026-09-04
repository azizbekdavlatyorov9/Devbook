import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AuthorPeriod } from '../entities/author.entity';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message:
      "Ism kamida 3 ta belgidan iborat bo'lishi kerak",
  })
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, {
    message:
      "Ism faqat lotin harflari va bo'sh joydan iborat bo'lishi kerak",
  })
  full_name!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  birth_year!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  death_year!: number;

  @IsString()
  @IsNotEmpty()
  bio!: string;

  @IsEnum(AuthorPeriod, {
    message: 'Bunday davr mavjud emas',
  })
  period!: AuthorPeriod;

  @IsString()
  @IsNotEmpty()
  work!: string;

  @IsString()
  @IsNotEmpty()
  region!: string;
}