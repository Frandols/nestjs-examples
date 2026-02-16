import Order from '@domain/order/order.entity'

export default interface OrderRepository {
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
}

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY')
