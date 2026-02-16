import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Min } from 'class-validator'

export class AddItemToOrderDto {
  @ApiProperty()
  @IsString()
  productId: string

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number
}
