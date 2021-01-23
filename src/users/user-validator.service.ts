import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/user.repository';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UserRepository) {}

  async validateUniqueEmail(email: string): Promise<void> {
    const isUserExist = await this.userRepository.getUserByEmail(email);
    if (!!isUserExist) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
