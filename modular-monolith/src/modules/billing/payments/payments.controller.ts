import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from '@payments/dto';
import { PaymentsService } from '@payments/payments.service';
import { IdResponseDto } from '@shared/dto/id-response.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a payment for a membership' })
  @ApiResponse({
    status: 201,
    description: 'Payment registered successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Membership not found' })
  async create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }
}
