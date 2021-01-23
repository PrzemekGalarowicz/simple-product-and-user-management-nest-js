import { Injectable } from '@nestjs/common';
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
    private userAddressRepository: UserAddressRepository
  ) { }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async prepareUserAddressesToSave(address: CreateUserAddressDto[] | UpdateUserAddressDto[]): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }

  async addUser(item: CreateUserDto): Promise<User> {
    const userToSave = new User();

    userToSave.firstName = item.firstName
    userToSave.lastName = item.lastName
    userToSave.email = item.email
    userToSave.birthday = item.birthday
    userToSave.role = item.role
    userToSave.address = await this.prepareUserAddressesToSave(item.address);

    return this.userRepository.save(userToSave);
  }

  async updateUser(id: string, item: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = item.firstName
    userToUpdate.lastName = item.lastName
    userToUpdate.email = item.email
    userToUpdate.birthday = item.birthday
    userToUpdate.role = item.role
    userToUpdate.address = await this.prepareUserAddressesToSave(item.address);

    await this.userAddressRepository.deleteUserAddressesByUserId(id)

    await this.userRepository.save(userToUpdate);

    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}
