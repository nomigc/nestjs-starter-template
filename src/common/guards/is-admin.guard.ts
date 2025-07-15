import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomForbiddenException } from 'src/utils';

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user?.role !== 'admin') {
      throw new CustomForbiddenException(
        `${user?.role} is not eligible to access this resource`,
      );
    }

    return true;
  }
}
