import { Roles } from '../../shared/enums/roles.enum';
import { IUserAddress } from '../interfaces/user.interface';

export interface ExternalUserAddressDto {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface ExternalUserDto {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  address?: Array<IUserAddress>;
  role: Roles;
}