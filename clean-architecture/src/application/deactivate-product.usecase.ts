import ProductRepository from '@domain/product/product.repository'

export default class DeactivateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    product.deactivate()

    await this.productRepository.save(product)
  }
}
