import { Roles } from '../../shared/enums/roles.enum';
import { UserAddress } from '../db/user-address.entity';

export interface ExternalUserAddressDto {
  country: string;
  city: string;
  street: string;
  number: string;
}

export interface ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  address?: UserAddress[];
  role: Roles;
}
