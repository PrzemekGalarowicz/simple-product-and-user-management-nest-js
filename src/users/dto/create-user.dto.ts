import { Roles } from '../../shared/enums/roles.enum';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested, IsNumber, IsEnum } from 'class-validator';

export class CreateUserAddressDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  houseNumber: number;

  @IsNumber()
  apartmentNumber?: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  birthday: string;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address?: Array<CreateUserAddressDto>;

  @IsEnum(Roles)
  role: Roles;
}