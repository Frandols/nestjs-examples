import { EventService } from '@events/application/event-service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from './membership.entity';

@Injectable()
export class MembershipsListener implements OnModuleInit {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly repo: Repository<MembershipEntity>,

    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.eventService.onGetMembershipById(async (event, respond) => {
      const membership = await this.repo.findOne({
        where: { id: event.payload.membershipId },
      });

      respond(membership);
    });

    this.eventService.onGetMemberMemberships(async (event, respond) => {
      const memberships = await this.repo.find({
        where: { memberId: event.payload.memberId },
      });

      respond({ memberships });
    });
  }
}
