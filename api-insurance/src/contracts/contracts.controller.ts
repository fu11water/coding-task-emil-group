import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { AddContractDto } from './contracts.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  addRequest(@Body() addContractDto: AddContractDto) {
    return this.contractsService.addContract(addContractDto);
  }

  @Get()
  geAllRequests() {
    return this.contractsService.getContracts();
  }

  @Delete(':id')
  deleteRequest(@Param('id') id: string) {
    return this.contractsService.deleteContract(id);
  }
}
