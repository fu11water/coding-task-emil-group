import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/users.entity';
import { Role } from '../entities/roles.entity';
import { AddUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async addUser(addUserData: AddUserDto) {
    const userRole = await this.rolesRepository.findOneBy({
      name: addUserData.role,
    });

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      addUserData.password,
      saltOrRounds,
    );

    const user = this.usersRepository.create({
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
