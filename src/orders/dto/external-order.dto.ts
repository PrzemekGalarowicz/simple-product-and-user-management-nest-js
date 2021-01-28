import { Status } from '../enums/status.enum';
import {
  IExternalOrderedProduct,
  IExternalUser,
} from '../interfaces/ordered-product.interface';

export interface ExternalOrderDto {
  id: string;
  products: Array<IExternalOrderedProduct>;
  user: IExternalUser;
  status: Status;
  totalPrice: number;
  createdAt: string;
}
