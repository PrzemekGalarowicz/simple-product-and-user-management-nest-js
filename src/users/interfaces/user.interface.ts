import { Roles } from '../../shared/enums/roles.enum';

export interface IUserAddress {
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  apartmentNumber?: number;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  address?: Array<IUserAddress>;
  role: Roles;
}
