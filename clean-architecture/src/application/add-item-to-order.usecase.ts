import IdGenerator from '@application/common/id-generator'
import IdDto from '@application/dto/id.dto'
import OrderRepository from '@domain/order/order.repository'
import ProductRepository from '@domain/product/product.repository'

export default class AddItemToOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: { orderId: string; productId: string }): Promise<IdDto> {
    const order = await this.orderRepository.findById(input.orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    const product = await this.productRepository.findById(input.productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const item = {
      id: this.idGenerator.generate(),
      productId: product.id,
      unitPrice: product.price.value,
    }

    order.addItem(item)

    await this.orderRepository.save(order)

    return { id: item.id }
  }
}
