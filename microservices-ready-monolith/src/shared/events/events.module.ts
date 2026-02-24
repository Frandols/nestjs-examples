import { EventRouter } from '@events/application/event-router';
import { DynamicModule, Module } from '@nestjs/common';

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
          provide: EventRouter,
          useValue: options.eventRouter,
        },
      ],
      exports: [EventRouter],
    };
  }
}
