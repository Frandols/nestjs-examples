import Entity from '@domain/entity'
import OrderItem, {
  OrderItemFromParams,
} from '@domain/order-item/order-item.entity'
import OrderStatus from '@domain/order/enums/order-status.enum'

export default class Order extends Entity<string> {
  private _status: OrderStatus = OrderStatus.CREATED
  private _items: OrderItem[] = []

  private constructor(id: string, items?: OrderItem[]) {
    super(id)

    if (items) this._items = items

    this.ensureValidState()
  }

  static initialize(id: string, items?: OrderItem[]): Order {
    const order = new Order(id, items)

    return order
  }

  static from(params: {
    id: string
    status: string
    items: OrderItemFromParams[]
  }): Order {
    const order = new Order(params.id)

    order._status = OrderStatus[params.status]
    order._items = params.items.map(OrderItem.from)

    return order
  }

  private ensureValidState() {
    if (this._status === OrderStatus.SHIPPED && this._items.length === 0) {
      throw new Error('Shipped order must have items')
    }
  }

  addItem(params: { id: string; productId: string; unitPrice: number }) {
    if (this._status !== OrderStatus.CREATED) {
      throw new Error('Cannot add items to a non-editable order')
    }

    const item = OrderItem.initialize(
      params.id,
      params.productId,
      params.unitPrice,
    )

    this._items.push(item)
  }

  canBeConfirmed() {
    return this._status === OrderStatus.CREATED && this._items.length > 0
  }

  confirm() {
    if (!this.canBeConfirmed()) throw new Error('Order cannot be confirmed')

    this._status = OrderStatus.CONFIRMED
  }

  get total(): number {
    return this._items.reduce((sum, i) => sum + i.subtotal, 0)
  }

  get status() {
    return this._status
  }

  get items() {
    return [...this._items]
  }

  cancel() {
    if (this._status !== OrderStatus.CONFIRMED)
      throw new Error('Order cannot be canceled')

    this._status = OrderStatus.CANCELLED
  }
}
