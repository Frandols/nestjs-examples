import { config } from '@app/config';
import { BillingModule } from '@billing/billing.module';
import { EventRouter } from '@events/application/event-router';
import { EventsModule } from '@events/events.module';
import { InMemoryEventBus } from '@events/infrastructure/in-memory-event-bus';
import { AccessControlModule } from '@modules/access-control/access-control.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { Global, Module } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

const inMemoryEventBus = new InMemoryEventBus(new EventEmitter2());

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    EventsModule.register({
      eventRouter: new EventRouter({
        MEMBERSHIP_CREATED: inMemoryEventBus,
        PAYMENT_COMPLETED: inMemoryEventBus,
      }),
    }),
  ],
  exports: [EventsModule],
})
export class EventRouterModule {}

@Module({
  imports: [
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
    EventRouterModule,
    BillingModule,
    NotificationsModule,
    AccessControlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
