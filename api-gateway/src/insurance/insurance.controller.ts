import {
  Controller,
  OnModuleInit,
  Inject,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiBearerAuth } from '@nestjs/swagger';

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
import { AuthGuard } from '../guards/auth.guard';
import { AccessGuard } from '../guards/access.guard';
import { Permission } from '../decorator/permission.decorator';
import { EPermissions } from '../types';

interface InsuranceService {
  AddContract(AddContractParams): Observable<AddContractResponse>;
  GeAllContracts({}): Observable<GetAllContractsResponse>;
  DeleteContract(DeleteContractParams): Observable<null>;
  AddRequest(AddRequestParams): Observable<AddRequestResponse>;
  GeAllRequests({}): Observable<GetAllRequestsResponse>;
  DeleteRequest(DeleteRequestParams): Observable<null>;
}

@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard, AccessGuard)
@Controller('insurance')
export class InsuranceController implements OnModuleInit {
  private insuranceService: InsuranceService;

  constructor(@Inject('INSURANCEPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.insuranceService =
      this.client.getService<InsuranceService>('InsuranceService');
  }

  @Permission(EPermissions.INSURANCE_CONTRACT_EDIT)
  @Get('contracts')
  async geAllContracts() {
    return this.insuranceService.GeAllContracts(null);
  }

  @Permission(EPermissions.INSURANCE_CONTRACT_ADD)
  @Post('contracts')
  async addContract(@Body() params: AddContractDto) {
    return this.insuranceService.AddContract(params);
  }

  @Permission(EPermissions.INSURANCE_CONTRACT_DELETE)
  @Delete('contracts/:id')
  async deleteContract(
    @Param('id')
    id: string,
  ) {
    const parsedId = Number.parseInt(id);
    return this.insuranceService.DeleteContract({ id: parsedId });
  }

  @Permission(EPermissions.INSURANCE_REQUEST_EDIT)
  @Get('requests')
  async geAllRequests() {
    return this.insuranceService.GeAllRequests(null);
  }

  @Permission(EPermissions.INSURANCE_REQUEST_ADD)
  @Post('requests')
  async addRequest(@Body() params: AddRequestDto) {
    return this.insuranceService.AddRequest(params);
  }

  @Permission(EPermissions.INSURANCE_REQUEST_DELETE)
  @Delete('requests/:id')
  async deleteRequest(
    @Param('id')
    id: string,
  ) {
    const parsedId = Number.parseInt(id);
    return this.insuranceService.DeleteRequest({ id: parsedId });
  }
}
