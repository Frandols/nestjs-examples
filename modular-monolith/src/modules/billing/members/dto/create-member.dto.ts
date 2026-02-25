import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({
    description: 'First name of the member',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the member',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email address of the member (must be unique)',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;
}
