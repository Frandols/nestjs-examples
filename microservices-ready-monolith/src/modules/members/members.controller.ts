import { CreateMemberDto } from '@modules/members/dto/create-member.dto';
import { UpdateMemberDto } from '@modules/members/dto/update-member.dto';
import { MembersService } from '@modules/members/members.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('members')
export class MembersController {
  constructor(private readonly service: MembersService) {}

  @Post()
  async create(@Body() dto: CreateMemberDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/payments')
  async findPayments(@Param('id') id: string) {
    return this.service.findPayments(id);
  }

  @Get(':id/memberships')
  async findMemberships(@Param('id') id: string) {
    return this.service.findMemberships(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.service.update(id, dto);
  }
}
