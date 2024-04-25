import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsRequest } from '../entities/ins-requests.entity';
import { InsContract } from '../entities/ins-contract.entity';
import { User } from '../entities/users.entity';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InsRequest]),
    TypeOrmModule.forFeature([InsContract]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
