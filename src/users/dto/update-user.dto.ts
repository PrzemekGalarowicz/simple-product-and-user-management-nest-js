import { Roles } from '../enums/roles.enum';
import { IUserAddress } from '../interfaces/user.interface';

export interface UpdateUserAddressDto {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface UpdateUserDto {
  name: string;
  surname: string;
  email: string;
  birthday: Array<number>;
  address?: Array<IUserAddress>;
  roles: Roles;
}