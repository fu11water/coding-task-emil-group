import {
  Controller,
  Get,
  Post,
  Delete,
  OnModuleInit,
  Inject,
  Body,
  Param,
  UseGuards,
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
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from '../decorator/permission.decorator';
import { AccessGuard } from '../guards/access.guard';
import { EPermissions } from '../types';

interface UserService {
  AddUser(AddUserParams): Observable<AddUserResponse>;
  GetAllUsers({}): Observable<GetAllUsersResponse>;
  DeleteUser(DeleteUserParams): Observable<null>;
  Login(LoginParams): Observable<LoginResponse>;
}

@ApiBearerAuth('accessToken')
@Controller('users')
export class IamController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USERPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Permission(EPermissions.USER_EDIT)
  @UseGuards(AuthGuard, AccessGuard)
  @Get()
  async getAllUsers() {
    return this.userService.GetAllUsers(null);
  }

  @Permission(EPermissions.USER_ADD)
  @UseGuards(AuthGuard, AccessGuard)
  @Post()
  async addUser(@Body() params: AddUserDto) {
    return this.userService
      .AddUser(params)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Permission(EPermissions.USER_DELETE)
  @UseGuards(AuthGuard, AccessGuard)
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
