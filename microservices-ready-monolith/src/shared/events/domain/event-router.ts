import { Injectable } from '@nestjs/common';
import { EventBus } from './event-bus';
import { EVENT_NAMES } from './event-names';

export type RoutingTable = Record<keyof typeof EVENT_NAMES, EventBus>;

@Injectable()
export class EventRouter implements EventBus {
  constructor(private readonly routingTable: RoutingTable) {}

  emit<T = any>(eventName: string, event: T): void {
    this.routingTable[eventName.split('.')[0]].emit(eventName, event);
  }

  on<T = any>(eventName: string, listener: (event: T) => void): void {
    this.routingTable[eventName.split('.')[0]].on(eventName, listener);
  }

  async request<R = any, T = any>(eventName: string, payload: T): Promise<R> {
    return this.routingTable[eventName.split('.')[0]].request(
      eventName,
      payload,
    );
  }
}

export const EVENT_ROUTER = 'EVENT_ROUTER';
