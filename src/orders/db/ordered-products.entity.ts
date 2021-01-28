import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Product } from '../../products/db/products.entity';

@Entity({
  name: 'ordered_products',
})
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({
    default: 0,
  })
  count: number;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
