import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @IsUUID()
  memberId: string;

  @IsUUID()
  planId: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
