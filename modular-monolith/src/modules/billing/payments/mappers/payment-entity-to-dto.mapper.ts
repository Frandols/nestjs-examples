import { PaymentDto } from '@billing/payments/dto/payment-dto';
import { PaymentEntity } from '@billing/payments/payment.entity';

export function paymentEntityToDto(entity: PaymentEntity): PaymentDto {
  return {
    membershipId: entity.membershipId,
    amount: entity.amount,
  };
}
