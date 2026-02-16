import OrderRepository from '@domain/order/order.repository'
import Product from '@domain/product/product.entity'
import ProductRepository from '@domain/product/product.repository'

export default class ConfirmOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    const products: Product[] = []

    for (const item of order.items) {
      const product = await this.productRepository.findById(item.product.id)

      if (!product) {
        throw new Error('Product not found')
      }

      products.push(product)
    }

    order.confirm(products)

    for (const product of products) {
      await this.productRepository.save(product)
    }

    await this.orderRepository.save(order)
  }
}
