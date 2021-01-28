import { MinLength, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateOrderedProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @MinLength(1)
  count: number;
}
