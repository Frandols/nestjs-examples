import { PlanEntity } from '@modules/plans/plan.entity';
import { PlansController } from '@modules/plans/plans.controller';
import { PlansListener } from '@modules/plans/plans.listener';
import { PlansService } from '@modules/plans/plans.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  providers: [PlansService, PlansListener],
  controllers: [PlansController],
  exports: [PlansService],
})
export class PlansModule {}
