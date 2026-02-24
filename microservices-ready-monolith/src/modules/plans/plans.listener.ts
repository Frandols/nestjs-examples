import { EventRouter } from '@events/application/event-router';
import { EventPayload } from '@events/domain/event-contracts';
import { PlanEntity } from '@modules/plans/plan.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlansListener implements OnModuleInit {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  onModuleInit() {
    this.eventRouter.onRequest(
      'GET_PLAN_BY_ID',
      this.handleGetPlanById.bind(this),
    );
  }

  private async handleGetPlanById(payload: EventPayload<'GET_PLAN_BY_ID'>) {
    const plan = await this.planRepository.findOne({
      where: { id: payload.planId },
    });

    if (!plan) return null;

    return {
      name: plan.name,
      durationDays: plan.durationDays,
    };
  }
}
