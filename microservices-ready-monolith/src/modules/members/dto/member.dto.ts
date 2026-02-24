import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDto } from '@shared/dto/id-response.dto';

export class MemberDto extends IdResponseDto {
  @ApiProperty({
    description: 'First name of the member',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the member',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the member',
    example: 'john.doe@example.com',
  })
  email: string;
}
