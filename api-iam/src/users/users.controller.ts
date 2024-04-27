import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { AddUserDto } from './users.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService')
  async addUser(
    addUserData: AddUserDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.addUser(addUserData);
  }

  @GrpcMethod('UserService')
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return { users };
  }

  @GrpcMethod('UserService')
  async deleteUser(
    { id }: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.deleteUser(id);
  }
}
