import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

import { User } from '../entities/users.entity';
import { Role } from '../entities/roles.entity';
import { AddUserDto } from './users.dto';
import { EErrors, getServiceErrorCode } from '../errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async addUser(addUserData: AddUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      login: addUserData.login,
    });

    if (existingUser) {
      throw new RpcException(getServiceErrorCode(EErrors.LOGIN_ALREADY_USED));
    }

    const userRole = await this.rolesRepository.findOneBy({
      name: addUserData.role,
    });

    if (!userRole) {
      throw new RpcException(getServiceErrorCode(EErrors.ROLE_NOT_EXIST));
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      addUserData.password,
      saltOrRounds,
    );

    const user = await this.usersRepository.create({
      name: addUserData.name,
      password: hashedPassword,
      login: addUserData.login,
      role: userRole,
    });
    await this.usersRepository.save(user);
    return {
      id: user.id,
      name: user.name,
      login: user.login,
      isActive: user.isActive,
    };
  }

  async getUsers() {
    const users = await this.usersRepository.find({
      select: ['id', 'name', 'login', 'isActive'],
    });
    return users;
  }

  async deleteUser(id: number) {
    if (!id) {
      return;
    }
    return this.usersRepository.delete(id);
  }
}
