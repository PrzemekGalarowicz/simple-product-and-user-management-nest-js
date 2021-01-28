import { CreateOrderedProductDto } from './create-ordered-product.dto'

import {
  MinLength,
  MaxLength,
  IsArray,
  IsUUID,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @MinLength(0)
  @MaxLength(500)
  additionalInformation: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  userAddressId: string;

  @ValidateNested({ each: true })
  @IsArray()
  products: CreateOrderedProductDto[];
}
