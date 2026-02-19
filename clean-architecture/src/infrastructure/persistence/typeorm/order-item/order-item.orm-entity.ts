import OrderItem from '@domain/order-item/order-item.entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('order_items')
export default class OrderItemOrmEntity {
  @PrimaryColumn()
  id: string

  @Column('varchar')
  productId: string

  @Column('decimal')
  unitPrice: number

  @Column('int')
  quantity: number

  @ManyToOne(() => OrderOrmEntity, (order) => order.items)
  order: OrderOrmEntity

  static from(domainOrderItem: OrderItem) {
    const item = new OrderItemOrmEntity()

    item.id = domainOrderItem.id
    item.productId = domainOrderItem.productId
    item.unitPrice = domainOrderItem.unitPrice
    item.quantity = domainOrderItem.quantity

    return item
  }
}
