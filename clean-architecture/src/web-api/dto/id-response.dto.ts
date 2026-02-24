import IdDto from '@application/dto/id.dto'
import { ApiProperty } from '@nestjs/swagger'

export class IdResponseDto implements IdDto {
  @ApiProperty({
    description: 'Unique identifier of the created/updated resource',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string
}
