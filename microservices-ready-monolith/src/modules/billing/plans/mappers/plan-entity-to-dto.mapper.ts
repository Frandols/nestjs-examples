import { PlanDto } from '@plans/dto/plan-dto';
import { PlanEntity } from '@plans/plan.entity';

export function planEntityToDto(entity: PlanEntity): PlanDto {
  return {
    id: entity.id,
    name: entity.name,
    price: entity.price,
    active: entity.active,
  };
}
