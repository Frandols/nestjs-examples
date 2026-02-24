import { ApiProperty } from '@nestjs/swagger';

export class MemberMembershipDto {
  @ApiProperty({
    description: 'Unique identifier of the plan',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  planId: string;

  @ApiProperty({
    description: 'Start date of the membership',
    example: '2022-01-01',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the membership',
    example: '2022-12-31',
  })
  endDate: Date;
}
