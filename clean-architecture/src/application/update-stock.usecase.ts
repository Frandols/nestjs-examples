import ProductRepository from '@domain/product/product.repository'

export default class UpdateStockUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: {
    productId: string
    quantity: number
    type: 'INCREASE' | 'DECREASE'
  }): Promise<void> {
    const product = await this.productRepository.findById(input.productId)

    if (!product) {
      throw new Error('Product not found')
    }

    if (input.type === 'INCREASE') {
      product.increaseStock(input.quantity)
    } else {
      product.decreaseStock(input.quantity)
    }

    await this.productRepository.save(product)
  }
}
