import Product from '@domain/product/product.entity'
import ProductRepository from '@domain/product/product.repository'
import ProductOrmEntity from '@infrastructure/persistence/typeorm/product/product.orm-entity'
import { DataSource, EntityManager, Repository } from 'typeorm'

export default class ProductRepositoryImpl implements ProductRepository {
  private readonly repository: Repository<ProductOrmEntity>

  constructor(dataSource: DataSource, manager?: EntityManager) {
    this.repository = manager
      ? manager.getRepository(ProductOrmEntity)
      : dataSource.getRepository(ProductOrmEntity)
  }

  async save(domainProduct: Product): Promise<void> {
    const ormProduct = ProductOrmEntity.from(domainProduct)

    await this.repository.save(ormProduct)
  }

  async findById(id: string): Promise<Product | null> {
    const ormProduct = await this.repository.findOne({ where: { id } })

    if (!ormProduct) return null

    return Product.from(ormProduct)
  }

  async increaseStock(params: {
    productId: string
    quantity: number
  }): Promise<void> {
    await this.repository.increment(
      { id: params.productId },
      'stock',
      params.quantity,
    )
  }

  async decreaseStock(params: {
    productId: string
    quantity: number
  }): Promise<void> {
    const result = await this.repository
      .createQueryBuilder()
      .update(ProductOrmEntity)
      .set({
        stock: () => `stock - ${params.quantity}`,
      })
      .where('id = :id', { id: params.productId })
      .andWhere('stock >= :quantity', { quantity: params.quantity })
      .execute()

    if (result.affected === 0) {
      throw new Error('Insufficient stock')
    }
  }
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY')
