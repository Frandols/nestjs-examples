import Entity from '@domain/entity'

export default class OrderItem extends Entity<string> {
  private _quantity: number = 1

  constructor(
    id: string,
    private readonly _productId: string,
    private readonly _unitPrice: number,
  ) {
    super(id)
  }

  static initialize(
    id: string,
    productId: string,
    unitPrice: number,
  ): OrderItem {
    return new OrderItem(id, productId, unitPrice)
  }

  static from(params: OrderItemFromParams): OrderItem {
    if (params.quantity <= 0) {
      throw new Error('Quantity must be greater than zero')
    }

    const orderItem = new OrderItem(
      params.id,
      params.productId,
      params.unitPrice,
    )

    orderItem._quantity = params.quantity

    return orderItem
  }

  get subtotal(): number {
    return this._unitPrice * this._quantity
  }

  get productId() {
    return this._productId
  }

  get unitPrice() {
    return this._unitPrice
  }

  get quantity() {
    return this._quantity
  }

  increaseQuantity() {
    this._quantity++
  }

  decreaseQuantity() {
    if (this._quantity <= 1) {
      throw new Error('Quantity must be greater than zero')
    }

    this._quantity--
  }
}

export interface OrderItemFromParams {
  id: string
  productId: string
  unitPrice: number
  quantity: number
}
