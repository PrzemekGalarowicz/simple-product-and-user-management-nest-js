import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { User } from './db/users.entity';
import { UserAddress } from './db/user-address.entity';
import { CreateUserDto, CreateUserAddressDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserAddressDto } from './dto/update-user.dto';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user-address.repository';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
    private connection: Connection
  ) { }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async prepareUserAddressesToSave(address: CreateUserAddressDto[] | UpdateUserAddressDto[], userAddressRepository: UserAddressRepository): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];

    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await userAddressRepository.save(addressToSave));
    }

    return addresses;
  }

  async addUser(user: CreateUserDto): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToSave = new User();

      userToSave.firstName = user.firstName;
      userToSave.lastName = user.lastName;
      userToSave.email = user.email;
      userToSave.role = user.role;
      userToSave.birthday = user.birthday;

      userToSave.address = await this.prepareUserAddressesToSave(user.address, manager.getCustomRepository(UserAddressRepository));

      return await manager.getCustomRepository(UserRepository).save(userToSave);
    });
  }

  async updateUser(id: string, item: UpdateUserDto): Promise<User> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const userToUpdate = await this.getUserById(id);

      userToUpdate.firstName = item.firstName
      userToUpdate.lastName = item.lastName
      userToUpdate.email = item.email
      userToUpdate.birthday = item.birthday
      userToUpdate.role = item.role
      userToUpdate.address = await this.prepareUserAddressesToSave(item.address, manager.getCustomRepository(UserAddressRepository));

      await this.userAddressRepository.deleteUserAddressesByUserId(id)

      return await await manager.getCustomRepository(UserRepository).save(userToUpdate);
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}
