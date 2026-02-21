import { EVENT_NAMES } from '@events/domain/event-names';
import { EventRouter } from '@events/domain/event-router';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

const baseModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.number().default(3000),

      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().default(5432),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),

      DB_SYNCHRONIZE: Joi.boolean().default(false),
      DB_LOGGING: Joi.boolean().default(false),
    }),
    validationOptions: { strict: true },
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
      logging: config.get<boolean>('DB_LOGGING'),
      autoLoadEntities: true,
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
        [EVENT_NAMES.MEMBER_EXISTS_BY_ID]: inMemoryEventBus,
        [EVENT_NAMES.MEMBERSHIP_CREATED]: redisEventBus,
        [EVENT_NAMES.PAYMENT_COMPLETED]: redisEventBus,
        [EVENT_NAMES.GET_MEMBER_MEMBERSHIPS]: inMemoryEventBus,
        [EVENT_NAMES.GET_MEMBER_PAYMENTS]: inMemoryEventBus,
        [EVENT_NAMES.GET_MEMBERSHIP_BY_ID]: inMemoryEventBus,
        [EVENT_NAMES.GET_PLAN_BY_ID]: inMemoryEventBus,
        [EVENT_NAMES.GET_MEMBER_BY_ID]: inMemoryEventBus,
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
        [EVENT_NAMES.MEMBER_EXISTS_BY_ID]: redisEventBus,
        [EVENT_NAMES.MEMBERSHIP_CREATED]: redisEventBus,
        [EVENT_NAMES.PAYMENT_COMPLETED]: redisEventBus,
        [EVENT_NAMES.GET_MEMBER_MEMBERSHIPS]: redisEventBus,
        [EVENT_NAMES.GET_MEMBER_PAYMENTS]: redisEventBus,
        [EVENT_NAMES.GET_MEMBERSHIP_BY_ID]: redisEventBus,
        [EVENT_NAMES.GET_PLAN_BY_ID]: redisEventBus,
        [EVENT_NAMES.GET_MEMBER_BY_ID]: redisEventBus,
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
