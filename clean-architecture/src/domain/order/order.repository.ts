import OrderItem from '@domain/order-item/order-item.entity'
import Order from '@domain/order/order.entity'

export default interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
}
