import IdGenerator from '@application/common/id-generator'
import Product from '@domain/product/product.entity'
import ProductRepository from '@domain/product/product.repository'

export default class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: {
    name: string
    price: number
    stock: number
  }): Promise<void> {
    const product = Product.initialize({
      id: this.idGenerator.generate(),
      ...input,
    })

    await this.productRepository.save(product)
  }
}
