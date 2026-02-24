import OrderRepository from '@domain/order/order.repository'
import ProductRepository from '@domain/product/product.repository'

export interface TransactionalRepositories {
  orderRepository: OrderRepository
  productRepository: ProductRepository
}

export default interface UnitOfWork {
  execute<T>(
    work: (repositories: TransactionalRepositories) => Promise<T>,
  ): Promise<T>
}
