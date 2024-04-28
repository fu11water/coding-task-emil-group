import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateRequestDto {
  @ApiProperty()
  accessToken: string;
}

export class AuthorizeRequestDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  permission: string;
}
