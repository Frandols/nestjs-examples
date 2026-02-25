import { CreateMemberDto } from '@members/dto/create-member.dto';
import { MemberDto } from '@members/dto/member.dto';
import { UpdateMemberDto } from '@members/dto/update-member.dto';
import { MembersService } from '@members/members.service';
import { MembershipDto } from '@memberships/dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentDto } from '@payments/dto';
import { IdResponseDto } from '@shared/dto/id-response.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly service: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiResponse({
    status: 201,
    description: 'Member created successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() dto: CreateMemberDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all members' })
  @ApiResponse({
    status: 200,
    description: 'List of all members',
    type: [MemberDto],
  })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({ name: 'id', description: 'Member UUID' })
  @ApiResponse({
    status: 200,
    description: 'Member found',
    type: MemberDto,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get(':id/payments')
  @ApiOperation({ summary: 'Get all payments for a member' })
  @ApiParam({ name: 'id', description: 'Member UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of payments for the member',
    type: [PaymentDto],
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findPayments(@Param('id') id: string) {
    return this.service.findPayments(id);
  }

  @Get(':id/memberships')
  @ApiOperation({ summary: 'Get all memberships for a member' })
  @ApiParam({ name: 'id', description: 'Member UUID' })
  @ApiResponse({
    status: 200,
    description: 'List of memberships for the member',
    type: [MembershipDto],
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findMemberships(@Param('id') id: string) {
    return this.service.findMemberships(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a member' })
  @ApiParam({ name: 'id', description: 'Member UUID' })
  @ApiResponse({
    status: 200,
    description: 'Member updated successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.service.update(id, dto);
  }
}
