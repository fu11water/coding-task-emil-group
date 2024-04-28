import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { AuthenticateRequestDto, AuthorizeRequestDto } from './dto/auth.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AuthService')
  async isAuthenticated(
    authenticateRequestDto: AuthenticateRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    const result = await this.appService.isAuthenticated(
      authenticateRequestDto,
    );
    return { isAuthenticated: result };
  }

  @GrpcMethod('AuthService')
  async isAuthorized(
    authorizeRequestDto: AuthorizeRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    const result = await this.appService.isAuthorized(authorizeRequestDto);
    return { isAuthorized: result };
  }
}
