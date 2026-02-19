import Order from '@domain/order/order.entity'
import OrderItemOrmEntity from '@infrastructure/persistence/typeorm/order-item/order-item.orm-entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  VersionColumn,
} from 'typeorm'

@Entity('orders')
export default class OrderOrmEntity {
  @PrimaryColumn()
  id: string

  @Column()
  status: string

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItemOrmEntity[]

  @VersionColumn()
  version: number

  static from(domainOrder: Order): OrderOrmEntity {
    const order = new OrderOrmEntity()

    order.id = domainOrder.id
    order.status = domainOrder.status
    order.items = domainOrder.items.map((item) => OrderItemOrmEntity.from(item))

    return order
  }
}
