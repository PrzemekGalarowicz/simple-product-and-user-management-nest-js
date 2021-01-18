import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role: Roles = context.switchToHttp().getRequest().headers.role;
    return role === 'ADMIN' || role === 'SELLER';
  }
}
