import IdGenerator from '@application/common/id-generator'
import OrderItem from '@domain/order-item/order-item.entity'
import Order from '@domain/order/order.entity'
import OrderRepository from '@domain/order/order.repository'

export default class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(): Promise<void> {
    const order = Order.initialize(this.idGenerator.generate())

    await this.orderRepository.save(order)
  }
}
