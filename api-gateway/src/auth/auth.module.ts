import { Module, Global } from '@nestjs/common';
import { UserCheckService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHPROTO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: 'authproto',
          protoPath: join(__dirname, './../proto/auth/auth.proto'),
        },
      },
    ]),
  ],
  providers: [UserCheckService],
  exports: [UserCheckService],
})
export class AuthModule {}
