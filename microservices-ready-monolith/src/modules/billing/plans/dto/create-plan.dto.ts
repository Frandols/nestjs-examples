import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Name of the plan',
    example: 'Monthly Premium',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Duration of the plan in days',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  durationDays: number;

  @ApiProperty({
    description: 'Price of the plan',
    example: 49.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Optional description of the plan',
    example: 'Full access to all facilities for 30 days',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
