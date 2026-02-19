import Order from '@domain/order/order.entity'
import OrderRepository from '@domain/order/order.repository'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import { DataSource, EntityManager, Repository } from 'typeorm'

export default class OrderRepositoryImpl implements OrderRepository {
  private readonly repository: Repository<OrderOrmEntity>

  constructor(dataSource: DataSource, manager?: EntityManager) {
    this.repository = manager
      ? manager.getRepository(OrderOrmEntity)
      : dataSource.getRepository(OrderOrmEntity)
  }

  async save(domainOrder: Order): Promise<void> {
    const ormOrder = OrderOrmEntity.from(domainOrder)

    await this.repository.save(ormOrder)
  }

  async findById(id: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOne({
      where: { id },
      relations: ['items'],
    })

    if (!ormOrder) return null

    return Order.from(ormOrder)
  }
}

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY')
