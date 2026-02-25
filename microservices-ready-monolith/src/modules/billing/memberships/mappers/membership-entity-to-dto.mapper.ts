import { MembershipDto } from '@memberships/dto/membership-dto';
import { MembershipEntity } from '@memberships/membership.entity';

export function membershipEntityToDto(entity: MembershipEntity): MembershipDto {
  return {
    memberId: entity.memberId,
    planId: entity.planId,
    startDate: entity.startDate,
    endDate: entity.endDate,
  };
}
