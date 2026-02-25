import { AccessControlService } from '@modules/access-control/access-control.service';
import { RegisterAccessDto } from '@modules/access-control/dto/register-access.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdResponseDto } from '@shared/dto/id-response.dto';

@ApiTags('Access Control')
@Controller('access-control')
export class AccessControlController {
  constructor(private readonly service: AccessControlService) {}

  @Post()
  @ApiOperation({ summary: 'Register an access attempt' })
  @ApiResponse({
    status: 201,
    description: 'Access log entry created successfully',
    type: IdResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async register(@Body() dto: RegisterAccessDto) {
    return this.service.create(dto);
  }
}
