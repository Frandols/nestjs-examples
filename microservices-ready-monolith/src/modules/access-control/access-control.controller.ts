import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { RegisterAccessDto } from './dto/register-access.dto';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly service: AccessControlService) {}

  @Post()
  async register(@Body() dto: RegisterAccessDto) {
    return this.service.registerAccess(dto);
  }

  @Get('member/:memberId')
  async findByMember(@Param('memberId') memberId: string) {
    return this.service.findByMember(memberId);
  }
}
