import { ApiProperty } from '@nestjs/swagger';

export class AddRequestDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  client: string;

  @ApiProperty()
  insContractId: number;

  @ApiProperty()
  userId: number;
}
