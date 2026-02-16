import IdGenerator from '@application/common/id-generator'
import OrderRepository from '@domain/order/order.repository'
import ProductRepository from '@domain/product/product.repository'

export default class AddItemToOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: { orderId: string; productId: string }): Promise<void> {
    const order = await this.orderRepository.findById(input.orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    const product = await this.productRepository.findById(input.productId)

    if (!product) {
      throw new Error('Product not found')
    }

    order.addItem({ id: this.idGenerator.generate(), product })

    await this.orderRepository.save(order)
  }
}
