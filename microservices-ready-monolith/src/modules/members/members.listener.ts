import { EventService } from '@events/application/event-service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './member.entity';

@Injectable()
export class MembersListener implements OnModuleInit {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repo: Repository<MemberEntity>,

    private readonly eventService: EventService,
  ) {}

  onModuleInit() {
    this.eventService.onMemberExistsById(async (request, respond) => {
      const exists = await this.repo.exists({
        where: { id: request.payload.memberId },
      });

      respond(exists);
    });
  }
}
