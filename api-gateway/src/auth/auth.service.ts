import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';

interface AuthService {
  IsAuthenticated({
    accessToken,
  }: {
    accessToken: string;
  }): Observable<{ isAuthenticated: boolean }>;
  IsAuthorized({
    accessToken,
    permission,
  }: {
    accessToken: string;
    permission: string;
  }): Observable<{ isAuthorized: boolean }>;
}

@Injectable()
export class UserCheckService implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTHPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  async checkUser(accessToken: string) {
    const authCheck = await this.authService
      .IsAuthenticated({ accessToken })
      .pipe(catchError((error) => throwError(() => new RpcException(error))))
      .toPromise();
    return authCheck.isAuthenticated;
  }

  async checkUserAccess(accessToken: string, permission: string) {
    const accessCheck = await this.authService
      .IsAuthorized({ accessToken, permission })
      .toPromise();
    return accessCheck.isAuthorized;
  }
}
