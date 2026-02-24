import { EventRouter } from '@events/application/event-router';
import { EventPayload } from '@events/domain/event-contracts';
import { MembershipEntity } from '@modules/memberships/membership.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsListener implements OnModuleInit {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly repo: Repository<MembershipEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  onModuleInit() {
    this.eventRouter.onRequest(
      'GET_MEMBERSHIP_BY_ID',
      this.handleGetMembershipById.bind(this),
    );

    this.eventRouter.onRequest(
      'GET_MEMBER_MEMBERSHIPS',
      this.handleGetMemberMemberships.bind(this),
    );
  }

  private async handleGetMembershipById(
    payload: EventPayload<'GET_MEMBERSHIP_BY_ID'>,
  ) {
    const membership = await this.repo.findOne({
      where: { id: payload.membershipId },
    });

    return {
      memberId: membership.memberId,
    };
  }

  private async handleGetMemberMemberships(
    payload: EventPayload<'GET_MEMBER_MEMBERSHIPS'>,
  ) {
    const memberships = await this.repo.find({
      where: { memberId: payload.memberId },
    });

    return memberships.map((membership) => ({
      planId: membership.planId,
      startDate: membership.startDate,
      endDate: membership.endDate,
    }));
  }
}
