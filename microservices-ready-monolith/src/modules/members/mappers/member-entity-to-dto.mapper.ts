import { MemberDto } from '@modules/members/dto/member.dto';
import { MemberEntity } from '@modules/members/member.entity';

export function memberEntityToDto(entity: MemberEntity): MemberDto {
  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
  };
}
