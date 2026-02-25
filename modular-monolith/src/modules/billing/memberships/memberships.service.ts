import { EventRouter } from '@events/application/event-router';
import { MemberEntity } from '@members/member.entity';
import { MembershipEntity } from '@memberships/membership.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from '@plans/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipsRepository: Repository<MembershipEntity>,
    @InjectRepository(MemberEntity)
    private readonly membersRepository: Repository<MemberEntity>,
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,

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
    const memberExists = await this.membersRepository.existsBy({
      id: memberId,
    });

    if (!memberExists)
      throw new NotFoundException(`Member ${memberId} not found`);

    const plan = await this.plansRepository.findOneBy({ id: planId });

    if (!plan) throw new NotFoundException(`Plan ${planId} not found`);

    const startDate = stringifiedStartDate
      ? new Date(stringifiedStartDate)
      : new Date();

    const membership = this.membershipsRepository.create({
      memberId,
      planId,
      startDate,
      endDate: this.calculateEndDate(startDate, plan.durationDays),
      active: true,
    });

    await this.membershipsRepository.save(membership);

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
