import Order from '@domain/order/order.entity'
import OrderRepository from '@domain/order/order.repository'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export default class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repository: Repository<OrderOrmEntity>,
  ) {}

  async save(domainOrder: Order): Promise<void> {
    const ormOrder = OrderOrmEntity.from(domainOrder)

    await this.repository.save(ormOrder)
  }

  async findById(id: string): Promise<Order | null> {
    const ormOrder = await this.repository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    })

    if (!ormOrder) return null

    return Order.from(ormOrder)
  }
}

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY')
