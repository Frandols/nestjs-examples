import OrderItem from '@domain/order-item/order-item.entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import { Check, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('order_items')
@Check(`TRIM("productId") <> ''`)
@Check(`"quantity" > 0`)
@Check(`"unitPrice" > 0`)
export default class OrderItemOrmEntity {
  @PrimaryColumn()
  id: string

  @Column({ nullable: false })
  productId: string

  @Column('int', { nullable: false })
  quantity: number

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  unitPrice: number

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, { nullable: false })
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
