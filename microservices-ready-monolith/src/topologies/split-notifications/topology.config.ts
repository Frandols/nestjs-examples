import { config } from '@app/config';
import { EventRouter } from '@events/application/event-router';
import { EventsModule } from '@events/events.module';
import { InMemoryEventBus } from '@events/infrastructure/in-memory-event-bus';
import { RedisEventBus } from '@events/infrastructure/redis-event-bus';
import { AccessControlModule } from '@modules/access-control/access-control.module';
import { MembersModule } from '@modules/members/members.module';
import { MembershipsModule } from '@modules/memberships/memberships.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { PlansModule } from '@modules/plans/plans.module';
import { Global, Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

const baseModules = [
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      synchronize: config.DB_SYNCHRONIZE,
      logging: config.DB_LOGGING,
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
    }),
  }),
];

const inMemoryEventBus = new InMemoryEventBus(new EventEmitter2());
const redisEventBus = new RedisEventBus();

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    EventsModule.register({
      eventRouter: new EventRouter({
        GET_MEMBER_EXISTS_BY_ID: inMemoryEventBus,
        MEMBERSHIP_CREATED: redisEventBus,
        PAYMENT_COMPLETED: redisEventBus,
        GET_MEMBER_MEMBERSHIPS: inMemoryEventBus,
        GET_MEMBER_PAYMENTS: inMemoryEventBus,
        GET_MEMBERSHIP_BY_ID: inMemoryEventBus,
        GET_PLAN_BY_ID: inMemoryEventBus,
      }),
    }),
  ],
  exports: [EventsModule],
})
export class MonolithEventRouterModule {}

@Global()
@Module({
  imports: [
    EventsModule.register({
      eventRouter: new EventRouter({
        GET_MEMBER_EXISTS_BY_ID: redisEventBus,
        MEMBERSHIP_CREATED: redisEventBus,
        PAYMENT_COMPLETED: redisEventBus,
        GET_MEMBER_MEMBERSHIPS: redisEventBus,
        GET_MEMBER_PAYMENTS: redisEventBus,
        GET_MEMBERSHIP_BY_ID: redisEventBus,
        GET_PLAN_BY_ID: redisEventBus,
      }),
    }),
  ],
  exports: [EventsModule],
})
export class NotificationsEventRouterModule {}

const topologyConfig: TopologyConfig = {
  apps: {
    monolith: {
      modules: [
        ...baseModules,
        MonolithEventRouterModule,
        AccessControlModule,
        MembersModule,
        MembershipsModule,
        PaymentsModule,
        PlansModule,
      ],
    },
    notifications: {
      modules: [
        ...baseModules,
        NotificationsEventRouterModule,
        NotificationsModule,
      ],
    },
  },
};

export default topologyConfig;
