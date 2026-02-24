import { CreatePaymentDto } from '@modules/payments/dto/create-payment.dto';
import { PaymentsService } from '@modules/payments/payments.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }
}
