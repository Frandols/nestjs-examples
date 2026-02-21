import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
