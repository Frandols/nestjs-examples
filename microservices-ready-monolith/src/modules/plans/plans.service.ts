import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  async create(planData: Partial<PlanEntity>): Promise<PlanEntity> {
    const plan = this.planRepository.create(planData);

    await this.planRepository.save(plan);

    return plan;
  }

  async findAll(): Promise<PlanEntity[]> {
    return this.planRepository.find();
  }

  async findOne(id: string): Promise<PlanEntity> {
    const plan = await this.planRepository.findOne({ where: { id } });

    if (!plan) throw new NotFoundException(`Plan ${id} not found`);

    return plan;
  }

  async update(id: string, data: Partial<PlanEntity>): Promise<PlanEntity> {
    const plan = await this.findOne(id);

    Object.assign(plan, data);

    await this.planRepository.save(plan);

    return plan;
  }

  async remove(id: string): Promise<void> {
    await this.planRepository.update(id, { active: false });
  }
}
