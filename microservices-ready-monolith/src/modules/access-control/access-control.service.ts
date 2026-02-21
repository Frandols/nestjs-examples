import { EventService } from '@events/application/event-service';
import { PaymentCompletedEvent } from '@events/domain/events/payment-completed.event';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLogEntity } from './access-log.entity';
import { RegisterAccessDto } from './dto/register-access.dto';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(AccessLogEntity)
    private readonly repo: Repository<AccessLogEntity>,

    private readonly eventService: EventService,
  ) {
    this.eventService.onPaymentCompleted(
      this.handlePaymentCompleted.bind(this),
    );
  }

  async registerAccess(dto: RegisterAccessDto): Promise<AccessLogEntity> {
    const log = this.repo.create({
      ...dto,
      granted: dto.granted ?? true,
    });

    return this.repo.save(log);
  }

  async findByMember(memberId: string): Promise<AccessLogEntity[]> {
    return this.repo.find({ where: { memberId } });
  }

  async handlePaymentCompleted(event: PaymentCompletedEvent) {
    await this.registerAccess({
      memberId: event.memberId,
      membershipId: event.membershipId,
      granted: true,
    });
  }
}
