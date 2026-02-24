import { MemberEntity } from '@modules/members/member.entity';
import { MembersController } from '@modules/members/members.controller';
import { MembersListener } from '@modules/members/members.listener';
import { MembersService } from '@modules/members/members.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [MembersService, MembersListener],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
