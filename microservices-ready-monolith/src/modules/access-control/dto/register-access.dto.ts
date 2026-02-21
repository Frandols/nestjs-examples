import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterAccessDto {
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @IsBoolean()
  @IsOptional()
  granted?: boolean;
}
