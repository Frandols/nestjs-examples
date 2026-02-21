import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './membership.entity';
import { MembershipsController } from './memberships.controller';
import { MembershipsListener } from './memberships.listener';
import { MembershipsService } from './memberships.service';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
  providers: [MembershipsService, MembershipsListener],
  controllers: [MembershipsController],
  exports: [MembershipsService],
})
export class MembershipsModule {}
