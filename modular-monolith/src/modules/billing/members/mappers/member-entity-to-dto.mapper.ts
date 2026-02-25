import { MemberDto } from '@members/dto';
import { MemberEntity } from '@members/member.entity';

export function memberEntityToDto(entity: MemberEntity): MemberDto {
  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
  };
}
