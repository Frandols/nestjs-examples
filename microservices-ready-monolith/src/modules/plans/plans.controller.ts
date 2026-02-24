import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { PlanDto } from '@modules/plans/dto/plan-dto';
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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdResponseDto } from '@shared/dto/id-response.dto';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plan' })
  @ApiResponse({
    status: 201,
    description: 'Plan created successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all plans' })
  @ApiResponse({
    status: 200,
    description: 'List of all plans',
    type: [PlanDto],
  })
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a plan by ID' })
  @ApiParam({ name: 'id', description: 'Plan UUID' })
  @ApiResponse({
    status: 200,
    description: 'Plan found',
    type: PlanDto,
  })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plan' })
  @ApiParam({ name: 'id', description: 'Plan UUID' })
  @ApiResponse({
    status: 200,
    description: 'Plan updated successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  update(@Param('id') id: string, @Body() body: UpdatePlanDto) {
    return this.plansService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft-delete a plan (deactivates it)' })
  @ApiParam({ name: 'id', description: 'Plan UUID' })
  @ApiResponse({
    status: 200,
    description: 'Plan deactivated successfully',
  })
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
