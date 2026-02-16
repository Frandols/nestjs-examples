import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Min } from 'class-validator'

export default class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock: number
}
