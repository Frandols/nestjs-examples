import { ApiProperty } from '@nestjs/swagger';

export class PlanDto {
  @ApiProperty({
    description: 'Unique identifier of the plan',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the plan',
    example: 'Monthly Premium',
  })
  name: string;

  @ApiProperty({
    description: 'Price of the plan',
    example: 49.99,
  })
  price: number;

  @ApiProperty({
    description: 'Whether the plan is currently active',
    example: true,
  })
  active: boolean;
}
