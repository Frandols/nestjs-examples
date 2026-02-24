import { AccessLogEntity } from '@modules/access-control/access-log.entity';
import { RegisterAccessDto } from '@modules/access-control/dto/register-access.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(AccessLogEntity)
    private readonly repo: Repository<AccessLogEntity>,
  ) {}

  async create(dto: RegisterAccessDto): Promise<{ id: string }> {
    const accessLog = this.repo.create({
      ...dto,
      granted: dto.granted ?? true,
    });

    await this.repo.save(accessLog);

    return { id: accessLog.id };
  }
}
