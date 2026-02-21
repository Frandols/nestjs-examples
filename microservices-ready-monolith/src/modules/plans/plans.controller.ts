import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanEntity } from './plan.entity';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() body: CreatePlanDto): Promise<PlanEntity> {
    return this.plansService.create(body);
  }

  @Get()
  findAll(): Promise<PlanEntity[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PlanEntity> {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePlanDto,
  ): Promise<PlanEntity> {
    return this.plansService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.plansService.remove(id);
  }
}
