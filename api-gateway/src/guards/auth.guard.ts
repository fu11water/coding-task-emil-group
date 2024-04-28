import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserCheckService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(UserCheckService) private UserCheckService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestAuthHeader = context.switchToHttp().getRequest()
      .headers.authorization;
    const accessToken = requestAuthHeader.replace('Bearer ', '');
    return this.UserCheckService.checkUser(accessToken);
  }
}
