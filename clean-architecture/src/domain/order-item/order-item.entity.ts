import Entity from '@domain/entity'
import Product, { ProductFromParams } from '@domain/product/product.entity'

export default class OrderItem extends Entity<string> {
  private _quantity: number = 1

  constructor(
    id: string,
    private readonly _product: Product,
  ) {
    super(id)
  }

  static initialize(id: string, product: Product): OrderItem {
    return new OrderItem(id, product)
  }

  static from(params: OrderItemFromParams): OrderItem {
    if (params.quantity <= 0) {
      throw new Error('Quantity must be greater than zero')
    }

    const orderItem = new OrderItem(params.id, Product.from(params.product))

    orderItem._quantity = params.quantity

    return orderItem
  }

  get subtotal(): number {
    return this._product.price.value * this._quantity
  }

  get product() {
    return this._product
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
  product: ProductFromParams
  quantity: number
}
