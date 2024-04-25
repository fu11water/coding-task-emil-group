import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { AddRequestDto } from './requests.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  addRequest(@Body() addRequestDto: AddRequestDto) {
    return this.requestsService.addRequest(addRequestDto);
  }

  @Get()
  geAllRequests() {
    return this.requestsService.getRequests();
  }

  @Delete(':id')
  deleteRequest(@Param('id') id: string) {
    return this.requestsService.deleteRequest(id);
  }
}
