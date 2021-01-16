import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
import { dateToArray } from '../shared/helpers/date.helper';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {

  }

  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    return this.userRepository.getAllUsers().map(user => this.mapUserToExternal(user))
  }

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(
      this.userRepository.getUserById(_id_)
    );
  }

  @Post()
  addUser(@Body() user: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(
      this.userRepository.addUser(user)
    )
  }

  @Put(':id')
  updateUser(@Param('id') _id_: string, @Body() updatedUser: UpdateUserDto): ExternalUserDto {
    return this.mapUserToExternal(
      this.userRepository.updateUser(_id_, updatedUser)
    );
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    this.userRepository.deleteUser(_id_);
  }

  mapUserToExternal(user: IUser): ExternalUserDto {
    return {
      ...user,
      birthday: dateToArray(user.birthday)
    };
  }
}
