import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/allowed-roles.decorator';
import { UserRole } from 'src/users/user.model';
import { AuthDataDto } from '../dtos/auth-data.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as AuthDataDto | undefined;

    if (!user) {
      throw new ForbiddenException('User nos authenticated');
    }

    const hasRole = requiredRoles.includes(user.userRole);

    if (!hasRole) {
      throw new ForbiddenException('User role is insufficient');
    }

    return true;
  }
}
