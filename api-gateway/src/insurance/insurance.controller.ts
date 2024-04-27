import {
  Controller,
  OnModuleInit,
  Inject,
  Get,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';

import {
  AddContractParams,
  AddContractResponse,
  GetAllContractsResponse,
  DeleteContractParams,
  AddRequestParams,
  AddRequestResponse,
  GetAllRequestsResponse,
  DeleteRequestParams,
} from './types';
import { AddContractDto } from './dto/contracts.dto';
import { AddRequestDto } from './dto/requests.dto';

interface InsuranceService {
  AddContract(AddContractParams): Observable<AddContractResponse>;
  GeAllContracts({}): Observable<GetAllContractsResponse>;
  DeleteContract(DeleteContractParams): Observable<null>;
  AddRequest(AddRequestParams): Observable<AddRequestResponse>;
  GeAllRequests({}): Observable<GetAllRequestsResponse>;
  DeleteRequest(DeleteRequestParams): Observable<null>;
}

@Controller('insurance')
export class InsuranceController implements OnModuleInit {
  private insuranceService: InsuranceService;

  constructor(@Inject('INSURANCEPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.insuranceService =
      this.client.getService<InsuranceService>('InsuranceService');
  }

  @Get('contracts')
  async geAllContracts() {
    return this.insuranceService.GeAllContracts(null);
  }

  @Post('contracts')
  async addContract(@Body() params: AddContractDto) {
    return this.insuranceService.AddContract(params);
  }

  @Delete('contracts/:id')
  async deleteContract(
    @Param('id')
    id: string,
  ) {
    const parsedId = Number.parseInt(id);
    return this.insuranceService.DeleteContract({ id: parsedId });
  }

  @Get('requests')
  async geAllRequests() {
    return this.insuranceService.GeAllRequests(null);
  }

  @Post('requests')
  async addRequest(@Body() params: AddRequestDto) {
    return this.insuranceService.AddRequest(params);
  }

  @Delete('requests/:id')
  async deleteRequest(
    @Param('id')
    id: string,
  ) {
    const parsedId = Number.parseInt(id);
    return this.insuranceService.DeleteRequest({ id: parsedId });
  }
}
