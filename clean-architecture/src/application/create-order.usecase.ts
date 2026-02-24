import IdGenerator from '@application/common/id-generator'
import IdDto from '@application/dto/id.dto'
import Order from '@domain/order/order.entity'
import OrderRepository from '@domain/order/order.repository'

export default class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(): Promise<IdDto> {
    const order = Order.initialize(this.idGenerator.generate())

    await this.orderRepository.save(order)

    return { id: order.id }
  }
}
