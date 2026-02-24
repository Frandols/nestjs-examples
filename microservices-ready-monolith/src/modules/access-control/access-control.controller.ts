import { AccessControlService } from '@modules/access-control/access-control.service';
import { RegisterAccessDto } from '@modules/access-control/dto/register-access.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly service: AccessControlService) {}

  @Post()
  async register(@Body() dto: RegisterAccessDto) {
    return this.service.create(dto);
  }
}
