import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAddress } from './user-address.entity';
import { Roles } from '../../shared/enums/roles.enum';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 24 })
  birthday: string;

  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;
}
