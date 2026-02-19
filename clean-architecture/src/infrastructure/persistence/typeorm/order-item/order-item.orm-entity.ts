import OrderItem from '@domain/order-item/order-item.entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import { Check, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('order_items')
@Check('product_id != ""', 'product_id_must_not_be_empty')
@Check('quantity > 0', 'quantity_must_be_positive')
@Check('unit_price > 0', 'unit_price_must_be_positive')
export default class OrderItemOrmEntity {
  @PrimaryColumn()
  id: string

  @Column('varchar')
  productId: string

  @Column('int')
  quantity: number

  @Column('decimal')
  unitPrice: number

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
