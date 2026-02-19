import Entity from '@domain/entity'
import Money from '@domain/product/value-objects/money.vo'
import Stock from '@domain/product/value-objects/stock.vo'

export default class Product extends Entity<string> {
  private _active: boolean = true

  private constructor(
    id: string,
    private _name: string,
    private _price: Money,
    private _stock: Stock,
  ) {
    super(id)
  }

  static initialize(params: {
    id: string
    name: string
    price: number
    stock: number
  }) {
    return new Product(
      params.id,
      params.name,
      Money.create(params.price),
      Stock.create(params.stock),
    )
  }

  static from(params: ProductFromParams) {
    const product = new Product(
      params.id,
      params.name,
      Money.create(params.price),
      Stock.create(params.stock),
    )

    product._active = params.active

    return product
  }

  deactivate() {
    this._active = false
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  get stock() {
    return this._stock
  }

  get isActive() {
    return this._active
  }
}

export interface ProductFromParams {
  id: string
  name: string
  price: number
  stock: number
  active: boolean
}
