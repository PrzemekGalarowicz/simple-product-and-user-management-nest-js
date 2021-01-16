import { Roles } from '../enums/roles.enum';
import { IUserAddress } from '../interfaces/user.interface';

export interface CreateUserAddressDto {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface CreateUserDto {
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  address?: Array<IUserAddress>;
  roles: Roles;
}