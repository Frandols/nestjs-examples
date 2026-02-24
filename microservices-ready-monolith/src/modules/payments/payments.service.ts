import { EventRouter } from '@events/application/event-router';
import { CreatePaymentDto } from '@modules/payments/dto/create-payment.dto';
import { PaymentEntity } from '@modules/payments/payment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  async create(dto: CreatePaymentDto): Promise<{ id: string }> {
    const membership = await this.eventRouter.request('GET_MEMBERSHIP_BY_ID', {
      membershipId: dto.membershipId,
    });

    if (!membership)
      throw new NotFoundException(`Membership ${dto.membershipId} not found`);

    const payment = this.repo.create({
      ...dto,
      memberId: membership.memberId,
      completed: true,
    });

    await this.repo.save(payment);

    this.eventRouter.emit('PAYMENT_COMPLETED', {
      memberId: membership.memberId,
      membershipId: payment.membershipId,
      amount: payment.amount,
    });

    return { id: payment.id };
  }
}
