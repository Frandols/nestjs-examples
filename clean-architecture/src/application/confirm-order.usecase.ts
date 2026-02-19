import UnitOfWork from '@application/common/unit-of-work'

export default class ConfirmOrderUseCase {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(orderId: string): Promise<void> {
    await this.unitOfWork.execute(async (repos) => {
      const order = await repos.orderRepository.findById(orderId)

      if (!order) {
        throw new Error('Order not found')
      }

      if (!order.canBeConfirmed()) {
        throw new Error('Order cannot be confirmed')
      }

      for (const item of order.items) {
        await repos.productRepository.decreaseStock({
          productId: item.productId,
          quantity: item.quantity,
        })
      }

      order.confirm()

      await repos.orderRepository.save(order)
    })
  }
}
