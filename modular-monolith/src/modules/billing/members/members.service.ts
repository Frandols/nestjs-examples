import { CreateMemberDto, MemberDto, UpdateMemberDto } from '@members/dto';
import { memberEntityToDto } from '@members/mappers';
import { MemberEntity } from '@members/member.entity';
import { MembershipDto } from '@memberships/dto';
import { membershipEntityToDto } from '@memberships/mappers';
import { MembershipEntity } from '@memberships/membership.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDto } from '@payments/dto';
import { paymentEntityToDto } from '@payments/mappers';
import { PaymentEntity } from '@payments/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly membersRepository: Repository<MemberEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
    @InjectRepository(MembershipEntity)
    private readonly membershipsRepository: Repository<MembershipEntity>,
  ) {}

  async create(dto: CreateMemberDto): Promise<Pick<MemberDto, 'id'>> {
    const member = this.membersRepository.create(dto);

    await this.membersRepository.save(member);

    return { id: member.id };
  }

  async update(
    id: string,
    dto: UpdateMemberDto,
  ): Promise<Pick<MemberDto, 'id'>> {
    const member = await this.findOne(id);

    await this.membersRepository.update(member.id, dto);

    return { id: member.id };
  }

  async findAll(): Promise<MemberDto[]> {
    const members = await this.membersRepository.find();

    return members.map(memberEntityToDto);
  }

  async findOne(id: string): Promise<MemberDto> {
    const member = await this.membersRepository.findOneBy({ id });

    if (!member) throw new NotFoundException(`Member ${id} not found`);

    return memberEntityToDto(member);
  }

  async findPayments(id: string): Promise<PaymentDto[]> {
    const member = await this.findOne(id);

    const payments = await this.paymentsRepository.find({
      where: { memberId: member.id },
    });

    return payments.map(paymentEntityToDto);
  }

  async findMemberships(id: string): Promise<MembershipDto[]> {
    const member = await this.findOne(id);

    const memberships = await this.membershipsRepository.find({
      where: { memberId: member.id },
    });

    return memberships.map(membershipEntityToDto);
  }
}
