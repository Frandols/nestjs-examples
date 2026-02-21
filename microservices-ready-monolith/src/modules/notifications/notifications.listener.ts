import { EventService } from '@events/application/event-service';
import { MembershipCreatedEvent } from '@events/domain/events/membership-created.event';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity, NotificationType } from './notification.entity';

@Injectable()
export class NotificationsListener implements OnModuleInit {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repo: Repository<NotificationEntity>,

    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.eventService.onMembershipCreated(
      this.handleMembershipCreated.bind(this),
    );

    this.eventService.onPaymentCompleted(
      this.handlePaymentCompleted.bind(this),
    );
  }

  private async create(payload: {
    memberId: string;
    type: NotificationType;
    message: string;
  }): Promise<NotificationEntity> {
    const notification = this.repo.create({ ...payload, sent: true });

    return this.repo.save(notification);
  }

  private async handleMembershipCreated(event: MembershipCreatedEvent) {
    await this.create({
      memberId: event.memberId,
      type: NotificationType.MEMBERSHIP_ASSIGNED,
      message: `Tu plan ${event.planName} ha sido asignado y dura ${event.durationDays} días.`,
    });
  }

  private async handlePaymentCompleted(event: {
    memberId: string;
    amount: number;
  }) {
    await this.create({
      memberId: event.memberId,
      type: NotificationType.PAYMENT_COMPLETED,
      message: `Pago de $${event.amount} completado para tu membresía.`,
    });
  }
}
