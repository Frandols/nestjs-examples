import { EventRouter } from '@events/application/event-router';
import { EventPayload } from '@events/domain/event-contracts';
import { PaymentEntity } from '@modules/payments/payment.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsListener implements OnModuleInit {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  onModuleInit() {
    this.eventRouter.onRequest(
      'GET_MEMBER_PAYMENTS',
      this.handleGetMemberPayments.bind(this),
    );
  }

  private async handleGetMemberPayments(
    payload: EventPayload<'GET_MEMBER_PAYMENTS'>,
  ) {
    const payments = await this.repo.find({
      where: { memberId: payload.memberId },
    });

    return payments.map((payment) => ({
      membershipId: payment.membershipId,
      amount: payment.amount,
    }));
  }
}
