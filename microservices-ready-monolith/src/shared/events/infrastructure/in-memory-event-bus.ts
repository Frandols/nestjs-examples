import { EventBus } from '@events/domain/event-bus';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class InMemoryEventBus extends EventBus {
  constructor(private readonly emitter: EventEmitter2) {
    super();
  }

  emit<T = any>(eventName: string, event: T): void {
    this.emitter.emit(eventName, event);
  }

  on<T = any>(eventName: string, listener: (event: T) => void): void {
    this.emitter.on(eventName, listener);
  }
}
