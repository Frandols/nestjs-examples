import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { PlanDto } from '@modules/plans/dto/plan-dto';
import { UpdatePlanDto } from '@modules/plans/dto/update-plan.dto';
import { planEntityToDto } from '@modules/plans/mappers/plan-entity-to-dto.mapper';
import { PlanEntity } from '@modules/plans/plan.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly repo: Repository<PlanEntity>,
  ) {}

  async create(dto: CreatePlanDto): Promise<Pick<PlanDto, 'id'>> {
    const plan = this.repo.create(dto);

    await this.repo.save(plan);

    return { id: plan.id };
  }

  async findAll(): Promise<PlanDto[]> {
    const plans = await this.repo.find();

    return plans.map(planEntityToDto);
  }

  async findOne(id: string): Promise<PlanDto> {
    const plan = await this.repo.findOne({ where: { id } });

    if (!plan) throw new NotFoundException(`Plan ${id} not found`);

    return planEntityToDto(plan);
  }

  async update(id: string, dto: UpdatePlanDto): Promise<Pick<PlanDto, 'id'>> {
    await this.repo.update(id, dto);

    return { id };
  }

  async remove(id: string): Promise<void> {
    await this.repo.update(id, { active: false });
  }
}
