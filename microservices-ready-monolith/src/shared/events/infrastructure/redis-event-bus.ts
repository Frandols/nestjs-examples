import { EventBus } from '@events/domain/event-bus';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import 'dotenv/config';
import Redis, { RedisOptions } from 'ioredis';

interface RedisMessage<T = any> {
  payload: T;
  correlationId?: string;
  replyTo?: string;
}

@Injectable()
export class RedisEventBus extends EventBus {
  private publisher: Redis;
  private subscriber: Redis;

  private handlers: Record<string, Array<(payload: any) => void>> = {};

  constructor() {
    super();

    this.publisher = new Redis(process.env.REDIS_URL);
    this.subscriber = new Redis(process.env.REDIS_URL);

    this.subscriber.on('message', async (channel, message) => {
      const parsed: RedisMessage = JSON.parse(message);

      const listeners = this.handlers[channel];

      if (!listeners) return;

      for (const listener of listeners) {
        await listener(parsed.payload);
      }
    });
  }

  emit<T = any>(eventName: string, event: T): void {
    const message: RedisMessage<T> = {
      payload: event,
    };

    this.publisher.publish(eventName, JSON.stringify(message));
  }

  on<T = any>(eventName: string, listener: (event: T) => void): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
      this.subscriber.subscribe(eventName);
    }

    this.handlers[eventName].push(listener);
  }
}
