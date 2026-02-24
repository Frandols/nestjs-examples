import { CreateMembershipDto } from '@modules/memberships/dto/create-membership.dto';
import { MembershipsService } from '@modules/memberships/memberships.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly service: MembershipsService) {}

  @Post()
  async create(@Body() dto: CreateMembershipDto) {
    return this.service.create(dto);
  }
}
