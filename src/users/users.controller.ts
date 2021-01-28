import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersDataService,
    private userValidator: UserValidatorService,
  ) {}

  @Get()
  async getAllUsers(): Promise<ExternalUserDto[]> {
    return await this.userRepository.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDto> {
    return await this.userRepository.getUserById(id);
  }

  @Post()
  async addUser(@Body() user: CreateUserDto): Promise<ExternalUserDto> {
    await this.userValidator.validateUniqueEmail(user.email);
    return await this.userRepository.addUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return await this.userRepository.updateUser(id, updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
