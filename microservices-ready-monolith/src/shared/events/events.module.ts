import { DynamicModule, Global, Module } from '@nestjs/common';
import { EventService } from './application/event-service';
import { EVENT_ROUTER, EventRouter } from './domain/event-router';

export interface EventsOptions {
  eventRouter: EventRouter;
}

@Module({})
export class EventsModule {
  static register(options: EventsOptions): DynamicModule {
    return {
      module: EventsModule,
      providers: [
        {
          provide: EVENT_ROUTER,
          useValue: options.eventRouter,
        },
        EventService,
      ],
      exports: [EventService],
    };
  }
}
