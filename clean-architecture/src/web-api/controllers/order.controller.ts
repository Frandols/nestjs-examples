import AddItemToOrderUseCase from '@application/add-item-to-order.usecase'
import CancelOrderUseCase from '@application/cancel-order.usecase'
import ConfirmOrderUseCase from '@application/confirm-order.usecase'
import CreateOrderUseCase from '@application/create-order.usecase'
import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import AddItemToOrderDto from '@web-api/dto/add-item-to-order.dto'

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
  async create() {
    await this.createOrderUseCase.execute()

    return { message: 'Order created' }
  }

  @Post(':id/items')
  async addItem(@Param('id') id: string, @Body() dto: AddItemToOrderDto) {
    await this.addItemUseCase.execute({
      orderId: id,
      ...dto,
    })

    return { message: 'Item added' }
  }

  @Post(':id/confirm')
  async confirm(@Param('id') id: string) {
    await this.confirmOrderUseCase.execute(id)

    return { message: 'Order confirmed' }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') orderId: string) {
    await this.cancelOrderUseCase.execute(orderId)

    return { message: 'Order cancelled' }
  }
}
