import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNumber, Min } from 'class-validator'

export default class UpdateStockDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number

  @ApiProperty()
  @IsIn(['INCREASE', 'DECREASE'])
  type: 'INCREASE' | 'DECREASE'
}
