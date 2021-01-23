import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity({
  name: 'user_addresses'
})
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  country: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  street: string;

  @Column({
    type: 'int'
  })
  number: number;

  @ManyToOne(type => User, user => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;
}
