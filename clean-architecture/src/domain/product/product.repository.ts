import Product from '@domain/product/product.entity'

export default interface ProductRepository {
  save(product: Product): Promise<void>
  findById(id: string): Promise<Product | null>
  increaseStock(params: { productId: string; quantity: number }): Promise<void>
  decreaseStock(params: { productId: string; quantity: number }): Promise<void>
}
