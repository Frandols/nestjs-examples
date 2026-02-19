import Product from '@domain/product/product.entity'
import { Check, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('products')
@Check(`TRIM("name") <> ''`)
@Check(`"price" > 0`)
@Check(`"stock" >= 0`)
export default class ProductOrmEntity {
  @PrimaryColumn()
  id: string

  @Column({ nullable: false })
  name: string

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number

  @Column('int', { nullable: false })
  stock: number

  @Column('boolean', { nullable: false })
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
