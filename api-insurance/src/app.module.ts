import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { ContractsModule } from './contracts/contracts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    RequestsModule,
    ContractsModule,
  ],
})
export class AppModule {}
