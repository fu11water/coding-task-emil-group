import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsContract } from '../entities/ins-contract.entity';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { InsRequest } from '../entities/ins-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InsContract])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
