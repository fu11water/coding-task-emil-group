import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';

import { User } from './entities/users.entity';
import { Role } from './entities/roles.entity';
import { Permission } from './entities/permissions.entity';
import { AuthenticateRequestDto, AuthorizeRequestDto } from './dto/auth.dto';
import { RpcException } from '@nestjs/microservices';
import { EErrors, getServiceErrorCode } from './errors';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async isAuthenticated(
    authenticateRequestDto: AuthenticateRequestDto,
  ): Promise<boolean> {
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(
        authenticateRequestDto.accessToken,
        process.env.JWT_SECRET_KEY,
      );
    } catch (error) {
      throw new RpcException(getServiceErrorCode(EErrors.JWT_MALFORMED));
    }

    const user = await this.userRepository.findOneBy({
      id: decodedToken.userId,
    });

    return user !== null;
  }

  async isAuthorized(
    authorizeRequestDto: AuthorizeRequestDto,
  ): Promise<boolean> {
    const decodedToken: any = jwt.decode(authorizeRequestDto.accessToken);

    const rolesWhichIncludesPermission = await this.roleRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('permissions.name = :permission', {
        permission: authorizeRequestDto.permission,
      })
      .andWhere('roles.name = :role', { role: decodedToken.role })
      .getMany();

    return rolesWhichIncludesPermission.length > 0;
  }
}
