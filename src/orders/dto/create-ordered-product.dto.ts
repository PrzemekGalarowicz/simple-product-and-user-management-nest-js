import { MinLength, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @MinLength(1)
  count: number;
}
