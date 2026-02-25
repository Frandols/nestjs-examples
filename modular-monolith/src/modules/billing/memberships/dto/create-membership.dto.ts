import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({
    description: 'ID of the member to assign the membership to',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsUUID()
  memberId: string;

  @ApiProperty({
    description: 'ID of the plan to assign',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  @IsUUID()
  planId: string;

  @ApiPropertyOptional({
    description: 'Start date of the membership (defaults to now if omitted)',
    example: '2026-03-01',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Whether the membership is active (defaults to true)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
