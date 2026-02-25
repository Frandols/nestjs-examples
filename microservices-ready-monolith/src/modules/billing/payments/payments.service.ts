import { EventRouter } from '@events/application/event-router';
import { MembershipEntity } from '@memberships/membership.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from '@payments/dto';
import { PaymentEntity } from '@payments/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
    @InjectRepository(MembershipEntity)
    private readonly membershipsRepository: Repository<MembershipEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  async create(dto: CreatePaymentDto): Promise<{ id: string }> {
    const membership = await this.membershipsRepository.findOneBy({
      id: dto.membershipId,
    });

    if (!membership)
      throw new NotFoundException(`Membership ${dto.membershipId} not found`);

    const payment = this.paymentsRepository.create({
      ...dto,
      memberId: membership.memberId,
      completed: true,
    });

    await this.paymentsRepository.save(payment);

    this.eventRouter.emit('PAYMENT_COMPLETED', {
      memberId: membership.memberId,
      membershipId: payment.membershipId,
      amount: payment.amount,
    });

    return { id: payment.id };
  }
}
