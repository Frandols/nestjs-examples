import { ApiProperty } from '@nestjs/swagger';

export class MemberPaymentDto {
  @ApiProperty({
    description: 'Unique identifier of the membership',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  membershipId: string;

  @ApiProperty({
    description: 'Amount of the payment',
    example: 100,
  })
  amount: number;
}
