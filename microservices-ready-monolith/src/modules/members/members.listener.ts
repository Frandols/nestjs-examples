import { EventRouter } from '@events/application/event-router';
import { EventPayload } from '@events/domain/event-contracts';
import { MemberEntity } from '@modules/members/member.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersListener implements OnModuleInit {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repo: Repository<MemberEntity>,

    private readonly eventRouter: EventRouter,
  ) {}

  onModuleInit() {
    this.eventRouter.onRequest(
      'GET_MEMBER_EXISTS_BY_ID',
      this.handleGetMemberExistsById.bind(this),
    );
  }

  private async handleGetMemberExistsById(
    payload: EventPayload<'GET_MEMBER_EXISTS_BY_ID'>,
  ) {
    return await this.repo.exists({
      where: { id: payload.memberId },
    });
  }
}
