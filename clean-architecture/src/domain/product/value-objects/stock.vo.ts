export default class Stock {
  private constructor(private readonly _value: number) {
    if (_value < 0) {
      throw new Error('Stock cannot be negative')
    }
  }

  static create(value: number) {
    return new Stock(value)
  }

  decrease(quantity: number): Stock {
    if (quantity > this._value) {
      throw new Error('Insufficient stock')
    }

    return new Stock(this._value - quantity)
  }

  increase(quantity: number): Stock {
    return new Stock(this._value + quantity)
  }

  get value() {
    return this._value
  }
}
