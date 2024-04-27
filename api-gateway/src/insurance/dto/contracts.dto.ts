import { ApiProperty } from '@nestjs/swagger';

export class AddContractDto {
  @ApiProperty()
  form: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  client: string;
}
