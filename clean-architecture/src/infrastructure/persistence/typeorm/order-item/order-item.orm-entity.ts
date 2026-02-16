import OrderItem from '@domain/order-item/order-item.entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import ProductOrmEntity from '@infrastructure/persistence/typeorm/product/product.orm-entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

@Entity('order_items')
export default class OrderItemOrmEntity {
  @PrimaryColumn()
  id: string

  @OneToOne(() => ProductOrmEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductOrmEntity

  @Column('int')
  quantity: number

  @ManyToOne(() => OrderOrmEntity, (order) => order.items)
  order: OrderOrmEntity

  static from(domainOrderItem: OrderItem) {
    const item = new OrderItemOrmEntity()

    item.id = domainOrderItem.id
    item.product = ProductOrmEntity.from(domainOrderItem.product)
    item.quantity = domainOrderItem.quantity

    return item
  }
}
