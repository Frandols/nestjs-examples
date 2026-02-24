import AddItemToOrderUseCase from '@application/add-item-to-order.usecase'
import CancelOrderUseCase from '@application/cancel-order.usecase'
import ConfirmOrderUseCase from '@application/confirm-order.usecase'
import CreateOrderUseCase from '@application/create-order.usecase'
import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import AddItemToOrderDto from '@web-api/dto/add-item-to-order.dto'
import { IdResponseDto } from '@web-api/dto/id-response.dto'

@ApiTags('orders')
@Controller('orders')
export default class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly addItemUseCase: AddItemToOrderUseCase,
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 200,
    description: 'Order created successfully',
    type: IdResponseDto,
  })
  async create() {
    return await this.createOrderUseCase.execute()
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add an item to an order' })
  @ApiResponse({
    status: 200,
    description: 'Item added successfully',
    type: IdResponseDto,
  })
  async addItem(@Param('id') id: string, @Body() dto: AddItemToOrderDto) {
    return await this.addItemUseCase.execute({
      orderId: id,
      ...dto,
    })
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirm an order' })
  @ApiResponse({
    status: 200,
    description: 'Order confirmed successfully',
  })
  async confirm(@Param('id') id: string) {
    return await this.confirmOrderUseCase.execute(id)
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({
    status: 200,
    description: 'Order cancelled successfully',
  })
  async cancel(@Param('id') orderId: string) {
    return await this.cancelOrderUseCase.execute(orderId)
  }
}
