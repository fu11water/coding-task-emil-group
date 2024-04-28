import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserCheckService } from '../auth/auth.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @Inject(UserCheckService) private UserCheckService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestAuthHeader = context.switchToHttp().getRequest()
      .headers.authorization;
    const accessToken = requestAuthHeader.replace('Bearer ', '');

    const permission = this.reflector.getAllAndOverride<string[]>(
      'permission',
      [context.getHandler(), context.getClass()],
    );
    if (!permission) {
      return false;
    }

    return this.UserCheckService.checkUserAccess(accessToken, permission);
  }
}
