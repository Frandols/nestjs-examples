import Product from '@domain/product/product.entity'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('products')
export default class ProductOrmEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  stock: number

  @Column()
  active: boolean

  static from(domainProduct: Product): ProductOrmEntity {
    const product = new ProductOrmEntity()

    product.id = domainProduct.id
    product.name = domainProduct.name
    product.price = domainProduct.price.value
    product.stock = domainProduct.stock.value
    product.active = domainProduct.isActive

    return product
  }
}
