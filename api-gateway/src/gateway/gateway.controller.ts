import {
  Controller,
  Get,
  Post,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Param,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import {
  AddUserParams,
  AddUserResponse,
  GetAllUsersResponse,
  DeleteUserParams,
  LoginParams,
  LoginResponse,
} from './types';
import { AddUserDto } from './dto/users.dto';
import { LoginDto } from './dto/auth.dto';

interface UserService {
  AddUser(AddUserParams): Observable<AddUserResponse>;
  GetAllUsers({}): Observable<GetAllUsersResponse>;
  DeleteUser(DeleteUserParams): Observable<null>;
  Login(LoginParams): Observable<LoginResponse>;
}

@Controller('users')
export class GatewayController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USERPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  async getAllUsers() {
    return this.userService.GetAllUsers(null);
  }

  @Post()
  async addUser(@Body() params: AddUserDto) {
    return this.userService.AddUser(params);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ) {
    const parsedId = Number.parseInt(id);
    return this.userService.DeleteUser({ id: parsedId });
  }

  @Post('login')
  async login(@Body() params: LoginDto) {
    return this.userService
      .Login(params)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
