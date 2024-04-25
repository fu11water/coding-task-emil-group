import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InsContract } from '../entities/ins-contract.entity';
import { AddContractDto } from './contracts.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(InsContract)
    private insContractRepository: Repository<InsContract>,
  ) {}

  async addContract(addContractData: AddContractDto) {
    const contract = this.insContractRepository.create(addContractData);
    return this.insContractRepository.save(contract);
  }

  async getContracts() {
    return this.insContractRepository.find();
  }

  async deleteContract(id: string) {
    return this.insContractRepository.delete(id);
  }
}
