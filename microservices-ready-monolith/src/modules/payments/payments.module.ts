import { PaymentEntity } from '@modules/payments/payment.entity';
import { PaymentsController } from '@modules/payments/payments.controller';
import { PaymentsListener } from '@modules/payments/payments.listener';
import { PaymentsService } from '@modules/payments/payments.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentsService, PaymentsListener],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
