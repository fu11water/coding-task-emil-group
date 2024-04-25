import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';

import { User } from '../entities/users.entity';
import { Role } from '../entities/roles.entity';
import { LoginDto } from './auth.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.role', 'name')
      .where('users.login = :login', { login: loginData.login })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('User with such login not exist');
    }

    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '12h',
        issuer: 'api-iam',
      },
    );

    return { 'access-token': token };
  }
}