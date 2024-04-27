import { ApiProperty } from '@nestjs/swagger';

export enum ERoles {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  BLOCKED = 'blocked',
}

export class AddUserDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ERoles })
  role: ERoles;

  @ApiProperty({ required: false, default: true })
  isActive?: boolean = true;
}
