import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterAccessDto {
  @ApiProperty({
    description: 'ID of the member requesting access',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({
    description: 'ID of the membership used for access',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  @IsString()
  @IsNotEmpty()
  membershipId: string;

  @ApiPropertyOptional({
    description: 'Whether access was granted (defaults to true)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  granted?: boolean;
}
