import { ApiProperty } from '@nestjs/swagger';
import { ERoles } from '../roles/roles.types';

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
