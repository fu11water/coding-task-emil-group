import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InsRequest } from '../entities/ins-requests.entity';
import { InsContract } from '../entities/ins-contract.entity';
import { User } from '../entities/users.entity';
import { AddRequestDto } from './requests.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(InsRequest)
    private insRequestRepository: Repository<InsRequest>,
    @InjectRepository(InsContract)
    private insContractRepository: Repository<InsContract>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addRequest(addRequestData: AddRequestDto) {
    const user = await this.userRepository.findOneBy({
      id: addRequestData.userId,
    });

    const contract = await this.insContractRepository.findOneBy({
      id: addRequestData.insContractId,
    });

    const request = this.insRequestRepository.create({
      amount: addRequestData.amount,
      reason: addRequestData.reason,
      details: addRequestData.details,
      client: addRequestData.client,
      user,
      insContract: contract,
    });

    const { id, amount, reason, details, client } = request;
    await this.insRequestRepository.save(request);
    return { id, amount, reason, details, client };
  }

  async getRequests() {
    return this.insRequestRepository.find({
      select: ['id', 'amount', 'reason', 'details', 'client'],
    });
  }

  async deleteRequest(id: number) {
    if (!id) {
      return;
    }
    return this.insRequestRepository.delete(id);
  }
}
