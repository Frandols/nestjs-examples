import UnitOfWork, { Repositories } from '@application/common/unit-of-work'
import OrderRepositoryImpl from '@infrastructure/persistence/typeorm/order/order.repository-impl'
import ProductRepositoryImpl from '@infrastructure/persistence/typeorm/product/product.repository-impl'
import { DataSource } from 'typeorm'

export class UnitOfWorkImpl implements UnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  async execute<T>(
    work: (repositories: Repositories) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (manager) => {
      const orderRepository = new OrderRepositoryImpl(this.dataSource, manager)
      const productRepository = new ProductRepositoryImpl(
        this.dataSource,
        manager,
      )

      return work({
        orderRepository,
        productRepository,
      })
    })
  }
}

export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK')
