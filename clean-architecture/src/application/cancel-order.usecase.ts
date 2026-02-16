import OrderRepository from '@domain/order/order.repository'

export default class CancelOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) throw new Error('Order not found')

    order.cancel()

    await this.orderRepository.save(order)
  }
}
