import { Injectable } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UsersDataService) {}

  validateUniqueEmail(email: string): void {
    const isUserExist = this.userRepository.getUserByEmail(email);
    if (!isUserExist) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
