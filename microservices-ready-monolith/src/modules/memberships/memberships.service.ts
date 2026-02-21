import { EventService } from '@events/application/event-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from './membership.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly repo: Repository<MembershipEntity>,

    private readonly eventService: EventService,
  ) {}

  async create({
    memberId,
    planId,
    startDate: stringifiedStartDate,
  }: {
    memberId: string;
    planId: string;
    startDate?: string;
  }): Promise<MembershipEntity> {
    const memberExists = await this.eventService.memberExistsById({ memberId });

    if (!memberExists)
      throw new NotFoundException(`Member ${memberId} not found`);

    const plan = await this.eventService.getPlanById({ planId });

    if (!plan) throw new NotFoundException(`Plan ${planId} not found`);

    const startDate = stringifiedStartDate
      ? new Date(stringifiedStartDate)
      : new Date();

    const membership = this.repo.create({
      memberId,
      planId,
      startDate,
      endDate: new Date(
        startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000,
      ),
      active: true,
    });

    await this.repo.save(membership);

    this.eventService.notifyMembershipCreated({
      planName: plan.name,
      durationDays: plan.durationDays,
      memberId,
    });

    return membership;
  }
}
