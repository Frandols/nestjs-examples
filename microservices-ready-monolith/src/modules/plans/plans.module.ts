import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './plan.entity';
import { PlansController } from './plans.controller';
import { PlansListener } from './plans.listener';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [PlansService, PlansListener],
  controllers: [PlansController],
  exports: [PlansService],
})
export class PlansModule {}
