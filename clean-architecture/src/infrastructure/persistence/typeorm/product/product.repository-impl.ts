import Product from '@domain/product/product.entity'
import ProductRepository from '@domain/product/product.repository'
import ProductOrmEntity from '@infrastructure/persistence/typeorm/product/product.orm-entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export default class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async save(domainProduct: Product): Promise<void> {
    const ormProduct = ProductOrmEntity.from(domainProduct)

    await this.repository.save(ormProduct)
  }

  async findById(id: string): Promise<Product | null> {
    const ormProduct = await this.repository.findOne({ where: { id } })

    if (!ormProduct) return null

    return Product.from(ormProduct)
  }
}
