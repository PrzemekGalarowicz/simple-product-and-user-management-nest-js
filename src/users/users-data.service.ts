import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { arrayToDate } from '../shared/helpers/date.helper';

@Injectable()
export class UsersDataService {
  private users: Array<IUser> = []

  getAllUsers(): Array<IUser> {
    return this.users
  }

  getUserById(id: string): IUser {
    return this.users.find(user => user.id === id)
  }

  getUserByIndex(id: string): number {
    return this.users.findIndex(product => product.id === id)
  }

  addUser(newUser: CreateUserDto): IUser {
    const user = { id: uuidv4(), ...newUser }
    this.users.push(user)
    return user
  }

  updateUser(id: string, dto: UpdateUserDto): IUser {
    const userIndex = this.getUserByIndex(id)
    const currentUser = this.getUserById(id)
    const updatedUser = {
      ...currentUser,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      birthday: arrayToDate(dto.birthday),
      address: dto.address,
      roles: dto.roles
    }
    this.users[userIndex] = updatedUser
    return updatedUser
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(user => user.id !== id)
  }
}
