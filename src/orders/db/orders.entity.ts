import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { User } from '../../users/db/users.entity';
import { UserAddress } from '../../users/db/user-address.entity';
import { OrderedProduct } from './ordered-products.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  additionalInformation: string;

  @Column({
    default: 0,
    type: 'float',
  })
  totalPrice: number;

  @Column('enum', {
    enum: Status,
  })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => UserAddress, (userAddress) => userAddress.id)
  userAddress: UserAddress;

  @OneToMany(type => OrderedProduct, orderedProduct => orderedProduct.id, {
    eager: true,
  })
  products: OrderedProduct[];
}
