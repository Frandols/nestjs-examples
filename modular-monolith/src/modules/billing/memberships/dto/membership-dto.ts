import { ApiProperty } from '@nestjs/swagger';

export class MembershipDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  memberId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  planId: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  endDate: Date;
}
