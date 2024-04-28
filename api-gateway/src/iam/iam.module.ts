import { Module } from '@nestjs/common';
import { IamController } from './iam.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERPROTO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: 'userproto',
          protoPath: join(__dirname, './../proto/user/user.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [IamController],
})
export class IamModule {}
