import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {

  }

  @Get()
  getAllUsers(): Array<ExternalUserDto> {
    return this.userRepository.getAllUsers()
  }

  @Get(':id')
  getUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): ExternalUserDto {
    return this.userRepository.getUserById(id)
  }

  @Post()
  addUser(@Body() user: CreateUserDto): ExternalUserDto {
    return this.userRepository.addUser(user)
  }

  @Put(':id')
  updateUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updatedUser: UpdateUserDto): ExternalUserDto {
    return this.userRepository.updateUser(id, updatedUser)
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    this.userRepository.deleteUser(id);
  }
}
