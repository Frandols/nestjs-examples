import { EventService } from '@events/application/event-service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Injectable()
export class PlansListener implements OnModuleInit {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,

    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.eventService.onGetPlanById(async (event, respond) => {
      const plan = await this.planRepository.findOne({
        where: { id: event.payload.planId },
      });

      if (!plan) {
        respond(null);

        return;
      }

      respond({
        name: plan.name,
        durationDays: plan.durationDays,
      });
    });
  }
}
