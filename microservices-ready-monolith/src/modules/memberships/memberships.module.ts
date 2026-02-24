import { MembershipEntity } from '@modules/memberships/membership.entity';
import { MembershipsController } from '@modules/memberships/memberships.controller';
import { MembershipsListener } from '@modules/memberships/memberships.listener';
import { MembershipsService } from '@modules/memberships/memberships.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity])],
  providers: [MembershipsService, MembershipsListener],
  controllers: [MembershipsController],
  exports: [MembershipsService],
})
export class MembershipsModule {}
