export default class Money {
  private constructor(private readonly _value: number) {
    if (_value < 0) {
      throw new Error('Price cannot be negative')
    }
  }

  static create(value: number) {
    return new Money(value)
  }

  get value() {
    return this._value
  }
}
