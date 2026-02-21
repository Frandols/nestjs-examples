import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
