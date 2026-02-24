import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID of the membership this payment is for',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @ApiProperty({
    description: 'Payment amount',
    example: 49.99,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
