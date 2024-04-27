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
    const { id, form, details, client } = contract;
    await this.insContractRepository.save(contract);
    return { id, form, details, client };
  }

  async getContracts() {
    return this.insContractRepository.find({
      select: ['id', 'form', 'details', 'client'],
    });
  }

  async deleteContract(id: number) {
    if (!id) {
      return;
    }
    return this.insContractRepository.delete(id);
  }
}
