import { MemberEntity } from '@members/member.entity';
import { MembersController } from '@members/members.controller';
import { MembersService } from '@members/members.service';
import { MembershipEntity } from '@memberships/membership.entity';
import { MembershipsController } from '@memberships/memberships.controller';
import { MembershipsService } from '@memberships/memberships.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '@payments/payment.entity';
import { PaymentsController } from '@payments/payments.controller';
import { PaymentsService } from '@payments/payments.service';
import { PlanEntity } from '@plans/plan.entity';
import { PlansController } from '@plans/plans.controller';
import { PlansService } from '@plans/plans.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberEntity,
      PaymentEntity,
      MembershipEntity,
      PlanEntity,
    ]),
  ],
  controllers: [
    MembersController,
    MembershipsController,
    PaymentsController,
    PlansController,
  ],
  providers: [
    MembersService,
    MembershipsService,
    PaymentsService,
    PlansService,
  ],
})
export class BillingModule {}
