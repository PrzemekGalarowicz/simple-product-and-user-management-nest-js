import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<IUser> = [];

  getAllUsers(): Array<IUser> {
    return this.users;
  }

  getUserById(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }

  getUserByIndex(id: string): number {
    return this.users.findIndex((user) => user.id === id);
  }

  getUserByEmail(email: string): IUser {
    return this.users.find((user) => user.email === email);
  }

  addUser(newUser: CreateUserDto): IUser {
    const user = { id: uuidv4(), ...newUser };
    this.users.push(user);
    return user;
  }

  updateUser(id: string, dto: UpdateUserDto): IUser {
    const userIndex = this.getUserByIndex(id);
    const currentUser = this.getUserById(id);
    const updatedUser = {
      ...currentUser,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      birthday: dto.birthday,
      address: dto.address,
      role: dto.role,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
