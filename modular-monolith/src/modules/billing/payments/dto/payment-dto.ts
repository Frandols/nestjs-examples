import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  membershipId: string;

  @ApiProperty({ example: 100 })
  amount: number;
}
