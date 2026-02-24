import { EventRouter } from '@events/application/event-router';
import { CreateMemberDto } from '@modules/members/dto/create-member.dto';
import { MemberDto } from '@modules/members/dto/member.dto';
import { UpdateMemberDto } from '@modules/members/dto/update-member.dto';
import { memberEntityToDto } from '@modules/members/mappers/member-entity-to-dto.mapper';
import { MemberEntity } from '@modules/members/member.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repo: Repository<MemberEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  async create(dto: CreateMemberDto): Promise<Pick<MemberDto, 'id'>> {
    const member = this.repo.create(dto);

    await this.repo.save(member);

    return { id: member.id };
  }

  async update(
    id: string,
    dto: UpdateMemberDto,
  ): Promise<Pick<MemberDto, 'id'>> {
    const member = await this.findOne(id);

    await this.repo.update(member.id, dto);

    return { id: member.id };
  }

  async findAll(): Promise<MemberDto[]> {
    const members = await this.repo.find();

    return members.map(memberEntityToDto);
  }

  async findOne(id: string): Promise<MemberDto> {
    const member = await this.repo.findOneBy({ id });

    if (!member) throw new NotFoundException(`Member ${id} not found`);

    return memberEntityToDto(member);
  }

  async findPayments(id: string) {
    const member = await this.findOne(id);

    return this.eventRouter.request('GET_MEMBER_PAYMENTS', {
      memberId: member.id,
    });
  }

  async findMemberships(id: string) {
    const member = await this.findOne(id);

    return this.eventRouter.request('GET_MEMBER_MEMBERSHIPS', {
      memberId: member.id,
    });
  }
}
