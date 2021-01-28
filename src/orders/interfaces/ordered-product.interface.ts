import { ExternalUserAddressDto } from '../../users/dto/external-user.dto';

export interface IExternalUser {
  firstName: string;
  lastName: string;
  email: string;
  address: ExternalUserAddressDto;
}

export interface IExternalOrderedProduct {
  orderedProductId: string;
  productId: string;
  name: string;
  price: number;
  count: number;
}
