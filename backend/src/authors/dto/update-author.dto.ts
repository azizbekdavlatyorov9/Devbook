import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AuthorPeriod } from '../entities/author.entity';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message:
      "Ism kamida 3 ta belgidan iborat bo'lishi kerak",
  })
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, {
    message:
      "Ism faqat lotin harflari va bo'sh joydan iborat bo'lishi kerak",
  })
  full_name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  birth_year?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  death_year?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsEnum(AuthorPeriod, {
    message: 'Bunday davr mavjud emas',
  })
  period?: AuthorPeriod;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  region?: string;
}