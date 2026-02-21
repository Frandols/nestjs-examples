import { EventService } from '@events/application/event-service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberEntity } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repo: Repository<MemberEntity>,

    private readonly eventService: EventService,
  ) {}

  async create(dto: CreateMemberDto): Promise<MemberEntity> {
    const member = this.repo.create(dto);

    await this.repo.save(member);

    return member;
  }

  async update(id: string, dto: UpdateMemberDto): Promise<MemberEntity> {
    await this.repo.update(id, dto);

    return this.repo.findOneBy({ id });
  }

  async findAll(): Promise<MemberEntity[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<MemberEntity> {
    return this.repo.findOneBy({ id });
  }

  async findPayments(id: string) {
    return this.eventService.getMemberPayments({ memberId: id });
  }

  async findMemberships(id: string) {
    return this.eventService.getMemberMemberships({ memberId: id });
  }
}
