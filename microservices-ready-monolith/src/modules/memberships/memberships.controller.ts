import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MembershipsService } from './memberships.service';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly service: MembershipsService) {}

  @Post()
  async create(@Body() dto: CreateMembershipDto) {
    return this.service.create(dto);
  }
}
