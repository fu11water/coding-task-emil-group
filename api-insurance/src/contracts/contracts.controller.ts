import { Controller } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { AddContractDto } from './contracts.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @GrpcMethod('InsuranceService')
  async addContract(
    addContractDto: AddContractDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.contractsService.addContract(addContractDto);
  }

  @GrpcMethod('InsuranceService')
  async geAllContracts() {
    const contracts = await this.contractsService.getContracts();
    return { contracts };
  }

  @GrpcMethod('InsuranceService')
  async deleteContract(
    { id }: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.contractsService.deleteContract(id);
  }
}
