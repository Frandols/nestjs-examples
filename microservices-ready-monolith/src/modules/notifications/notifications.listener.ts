import { EventRouter } from '@events/application/event-router';
import { EventPayload } from '@events/domain/event-contracts';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity, NotificationType } from './notification.entity';

@Injectable()
export class NotificationsListener implements OnModuleInit {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repo: Repository<NotificationEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  onModuleInit() {
    this.eventRouter.on(
      'MEMBERSHIP_CREATED',
      this.handleMembershipCreated.bind(this),
    );

    this.eventRouter.on(
      'PAYMENT_COMPLETED',
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

  private async handleMembershipCreated(
    payload: EventPayload<'MEMBERSHIP_CREATED'>,
  ) {
    await this.create({
      memberId: payload.memberId,
      type: NotificationType.MEMBERSHIP_ASSIGNED,
      message: `Tu plan ${payload.planName} ha sido asignado y dura ${payload.durationDays} días.`,
    });
  }

  private async handlePaymentCompleted(
    payload: EventPayload<'PAYMENT_COMPLETED'>,
  ) {
    await this.create({
      memberId: payload.memberId,
      type: NotificationType.PAYMENT_COMPLETED,
      message: `Pago de $${payload.amount} completado para tu membresía.`,
    });
  }
}
