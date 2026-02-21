import { EventService } from '@events/application/event-service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './payment.entity';
@Injectable()
export class PaymentsListener implements OnModuleInit {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,

    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.eventService.onGetMemberPayments(async (request, respond) => {
      const payments = await this.repo.find({
        where: { memberId: request.payload.memberId },
      });

      respond({
        payments,
      });
    });
  }
}
