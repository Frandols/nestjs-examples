import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './member.entity';
import { MembersController } from './members.controller';
import { MembersListener } from './members.listener';
import { MembersService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [MembersService, MembersListener],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
