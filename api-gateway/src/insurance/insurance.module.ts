import { Module } from '@nestjs/common';
import { InsuranceController } from './insurance.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSURANCEPROTO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: 'insuranceproto',
          protoPath: join(__dirname, './../proto/insurance/insurance.proto'),
        },
      },
    ]),
  ],
  controllers: [InsuranceController],
})
export class InsuranceModule {}
