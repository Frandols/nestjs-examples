import { CreateMembershipDto } from '@modules/memberships/dto/create-membership.dto';
import { MembershipsService } from '@modules/memberships/memberships.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdResponseDto } from '@shared/dto/id-response.dto';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly service: MembershipsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new membership for a member' })
  @ApiResponse({
    status: 201,
    description: 'Membership created successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Member or Plan not found' })
  async create(@Body() dto: CreateMembershipDto) {
    return this.service.create(dto);
  }
}
