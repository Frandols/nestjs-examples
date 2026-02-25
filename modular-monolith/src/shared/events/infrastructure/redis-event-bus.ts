import { config } from '@app/config';
import { EventBus } from '@events/domain/event-bus';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

interface RedisMessage<T = any> {
  payload: T;
  correlationId?: string;
  replyTo?: string;
}

@Injectable()
export class RedisEventBus implements EventBus {
  private publisher: Redis;
  private subscriber: Redis;

  private handlers: Record<string, Array<(payload: any) => void>> = {};

  constructor() {
    const redisUrl = config.REDIS_URL;

    this.publisher = new Redis(redisUrl);
    this.subscriber = new Redis(redisUrl);

    this.subscriber.on('message', async (channel, message) => {
      const parsed: RedisMessage = JSON.parse(message);

      const listeners = this.handlers[channel];

      if (!listeners) return;

      for (const listener of listeners) {
        listener(parsed.payload);
      }
    });
  }

  emit<T = any>(eventName: string, event: T): void {
    const message: RedisMessage<T> = {
      payload: event,
    };

    this.publisher.publish(eventName, JSON.stringify(message));
  }

  on<T = any>(eventName: string, listener: (event: T) => void): () => void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];

      this.subscriber.subscribe(eventName);
    }

    this.handlers[eventName].push(listener);

    return () => {
      this.handlers[eventName] = this.handlers[eventName].filter(
        (h) => h !== listener,
      );

      if (this.handlers[eventName].length === 0) {
        delete this.handlers[eventName];

        this.subscriber.unsubscribe(eventName);
      }
    };
  }
}
