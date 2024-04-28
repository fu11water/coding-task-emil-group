import { UnauthorizedException, BadRequestException } from '@nestjs/common';

export const projectErrors = {
  '101': new UnauthorizedException('User with such login not exist'),
  '102': new UnauthorizedException('Wrong credentials'),
  '103': new BadRequestException('User with such login already exist'),
  '104': new BadRequestException('Role does not exist'),
  '201': new UnauthorizedException('JWT malformed'),
};
