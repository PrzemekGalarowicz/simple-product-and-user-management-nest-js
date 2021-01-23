import { Roles } from '../../shared/enums/roles.enum';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class UpdateUserAddressDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;
}

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  birthday: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  address?: Array<UpdateUserAddressDto>;

  @IsEnum(Roles)
  role: Roles;
}
