import { EventRouter } from '@events/application/event-router';
import { MembershipEntity } from '@modules/memberships/membership.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly repo: Repository<MembershipEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  async create({
    memberId,
    planId,
    startDate: stringifiedStartDate,
  }: {
    memberId: string;
    planId: string;
    startDate?: string;
  }): Promise<{ id: string }> {
    const memberExists = await this.eventRouter.request(
      'GET_MEMBER_EXISTS_BY_ID',
      { memberId },
    );

    if (!memberExists)
      throw new NotFoundException(`Member ${memberId} not found`);

    const plan = await this.eventRouter.request('GET_PLAN_BY_ID', { planId });

    if (!plan) throw new NotFoundException(`Plan ${planId} not found`);

    const startDate = stringifiedStartDate
      ? new Date(stringifiedStartDate)
      : new Date();

    const membership = this.repo.create({
      memberId,
      planId,
      startDate,
      endDate: this.calculateEndDate(startDate, plan.durationDays),
      active: true,
    });

    await this.repo.save(membership);

    this.eventRouter.emit('MEMBERSHIP_CREATED', {
      planName: plan.name,
      durationDays: plan.durationDays,
      memberId,
    });

    return { id: membership.id };
  }

  private calculateEndDate(startDate: Date, durationDays: number): Date {
    return new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
  }
}
