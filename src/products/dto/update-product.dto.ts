import { Tags } from '../enums/tags.enum';
import {
  IsNumber,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class UpdateProductDto {
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  count: number;

  @ValidateNested({ each: true })
  @IsEnum(Tags)
  @IsArray()
  tags: Array<Tags>;
}
