import { UpdateOrderedProductDto } from './update-ordered-product.dto';
import { Status } from '../enums/status.enum';

import {
  IsEnum,
  MinLength,
  MaxLength,
  IsArray,
  IsUUID,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @MinLength(0)
  @MaxLength(500)
  additionalInformation: string;

  @MinLength(0)
  totalPrice: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  userAddressId: string;

  @ValidateNested({ each: true })
  @IsArray()
  products: Array<UpdateOrderedProductDto>;

  @IsEnum(Status)
  status: Status;
}
