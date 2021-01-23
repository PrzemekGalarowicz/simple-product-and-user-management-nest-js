import { EntityRepository, Repository, In } from 'typeorm';
import { UserAddress } from './user-address.entity';

@EntityRepository(UserAddress)
export class UserAddressRepository extends Repository<UserAddress> {
  async deleteUserAddressesByUserId(id: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id
      }
    });

    this.remove(usersAddresses);
  }
}
