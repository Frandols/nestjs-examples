import CreateProductUseCase from '@application/create-product.usecase'
import DeactivateProductUseCase from '@application/deactivate-product.usecase'
import UpdateStockUseCase from '@application/update-stock.usecase'
import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import CreateProductDto from '@web-api/dto/create-product.dto'
import UpdateStockDto from '@web-api/dto/update-stock.dto'

@ApiTags('products')
@Controller('products')
export default class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateStockUseCase: UpdateStockUseCase,
    private readonly deactivateProductUseCase: DeactivateProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.createProductUseCase.execute(createProductDto)

    return { message: 'Product created' }
  }

  @Patch(':id/stock')
  async updateStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    await this.updateStockUseCase.execute({
      productId: id,
      ...updateStockDto,
    })

    return { message: 'Stock updated' }
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string) {
    await this.deactivateProductUseCase.execute(id)

    return { message: 'Product deactivated' }
  }
}
