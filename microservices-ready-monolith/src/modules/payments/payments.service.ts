import { EventService } from '@events/application/event-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,

    private readonly eventService: EventService,
  ) {}

  async create(dto: CreatePaymentDto): Promise<PaymentEntity> {
    const membership = await this.eventService.getMembershipById({
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

    this.eventService.notifyPaymentCompleted({
      memberId: membership.memberId,
      membershipId: payment.membershipId,
      amount: payment.amount,
    });

    return payment;
  }
}
