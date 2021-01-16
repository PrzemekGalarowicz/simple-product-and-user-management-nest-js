import { Roles } from '../enums/roles.enum';

export interface IUserAddress {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  address?: Array<IUserAddress>;
  roles: Roles;
}