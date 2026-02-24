import CreateProductUseCase from '@application/create-product.usecase'
import DeactivateProductUseCase from '@application/deactivate-product.usecase'
import UpdateStockUseCase from '@application/update-stock.usecase'
import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import CreateProductDto from '@web-api/dto/create-product.dto'
import { IdResponseDto } from '@web-api/dto/id-response.dto'
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
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 200,
    description: 'Product created successfully',
    type: IdResponseDto,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto)
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: 'Update stock of a product' })
  @ApiResponse({
    status: 200,
    description: 'Stock updated successfully',
  })
  async updateStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.updateStockUseCase.execute({
      productId: id,
      ...updateStockDto,
    })
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a product' })
  @ApiResponse({
    status: 200,
    description: 'Product deactivated successfully',
  })
  async deactivate(@Param('id') id: string) {
    return await this.deactivateProductUseCase.execute(id)
  }
}
