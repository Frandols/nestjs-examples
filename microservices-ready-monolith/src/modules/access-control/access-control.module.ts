import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlController } from './access-control.controller';
import { AccessControlService } from './access-control.service';
import { AccessLogEntity } from './access-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLogEntity])],
  providers: [AccessControlService],
  controllers: [AccessControlController],
  exports: [AccessControlService],
})
export class AccessControlModule {}
