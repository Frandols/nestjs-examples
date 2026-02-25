import { AccessControlController } from '@modules/access-control/access-control.controller';
import { AccessControlService } from '@modules/access-control/access-control.service';
import { AccessLogEntity } from '@modules/access-control/access-log.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLogEntity])],
  providers: [AccessControlService],
  controllers: [AccessControlController],
  exports: [AccessControlService],
})
export class AccessControlModule {}
