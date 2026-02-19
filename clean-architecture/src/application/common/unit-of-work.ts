import OrderRepository from '@domain/order/order.repository'
import ProductRepository from '@domain/product/product.repository'

export interface Repositories {
  orderRepository: OrderRepository
  productRepository: ProductRepository
}

export default interface UnitOfWork {
  execute<T>(work: (repositories: Repositories) => Promise<T>): Promise<T>
}
