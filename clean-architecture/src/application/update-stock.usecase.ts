import ProductRepository from '@domain/product/product.repository'

export default class UpdateStockUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: {
    productId: string
    quantity: number
    type: 'INCREASE' | 'DECREASE'
  }): Promise<void> {
    if (input.quantity <= 0) {
      throw new Error('Quantity must be positive')
    }

    const product = await this.productRepository.findById(input.productId)

    if (!product) {
      throw new Error('Product not found')
    }

    if (input.type === 'INCREASE') {
      await this.productRepository.increaseStock({
        productId: input.productId,
        quantity: input.quantity,
      })

      return
    }

    await this.productRepository.decreaseStock({
      productId: input.productId,
      quantity: input.quantity,
    })
  }
}
