import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto, PlanDto, UpdatePlanDto } from '@plans/dto';
import { planEntityToDto } from '@plans/mappers';
import { PlanEntity } from '@plans/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly plansRepository: Repository<PlanEntity>,
  ) {}

  async create(dto: CreatePlanDto): Promise<Pick<PlanDto, 'id'>> {
    const plan = this.plansRepository.create(dto);

    await this.plansRepository.save(plan);

    return { id: plan.id };
  }

  async findAll(): Promise<PlanDto[]> {
    const plans = await this.plansRepository.find();

    return plans.map(planEntityToDto);
  }

  async findOne(id: string): Promise<PlanDto> {
    const plan = await this.plansRepository.findOne({ where: { id } });

    if (!plan) throw new NotFoundException(`Plan ${id} not found`);

    return planEntityToDto(plan);
  }

  async update(id: string, dto: UpdatePlanDto): Promise<Pick<PlanDto, 'id'>> {
    await this.plansRepository.update(id, dto);

    return { id };
  }

  async remove(id: string): Promise<void> {
    await this.plansRepository.update(id, { active: false });
  }
}
