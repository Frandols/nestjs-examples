import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { UpdatePlanDto } from '@modules/plans/dto/update-plan.dto';
import { PlansService } from '@modules/plans/plans.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePlanDto) {
    return this.plansService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
