import { Controller } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { AddRequestDto } from './requests.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @GrpcMethod('InsuranceService')
  async addRequest(
    addRequestDto: AddRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.requestsService.addRequest(addRequestDto);
  }

  @GrpcMethod('InsuranceService')
  async geAllRequests() {
    const requests = await this.requestsService.getRequests();
    return { requests };
  }

  @GrpcMethod('InsuranceService')
  async deleteRequest(
    { id }: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.requestsService.deleteRequest(id);
  }
}
