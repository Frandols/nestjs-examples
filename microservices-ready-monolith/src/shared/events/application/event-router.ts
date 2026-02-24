import { EventBus } from '@events/domain/event-bus';
import {
  EmitContractMap,
  EmitName,
  EventContractMap,
  EventName,
  RequestContractMap,
  RequestName,
} from '@events/domain/event-contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventRouter {
  constructor(private readonly routingTable: Record<EventName, EventBus>) {}

  private resolveBus(eventName: EventName): EventBus {
    return this.routingTable[eventName.split('.')[0]];
  }

  emit<Name extends EmitName>(
    eventName: Name,
    eventPayload: EmitContractMap[Name]['payload'],
  ): void {
    this.resolveBus(eventName).emit(eventName, eventPayload);
  }

  on<Name extends EmitName>(
    eventName: Name,
    listener: (payload: EmitContractMap[Name]['payload']) => void,
  ): () => void {
    return this.resolveBus(eventName).on(eventName, listener);
  }

  async request<Name extends RequestName>(
    eventName: Name,
    payload: EventContractMap[Name]['payload'],
  ): Promise<EventContractMap[Name]['response']> {
    const responseEventName =
      `${eventName}.response.${crypto.randomUUID()}` as const;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        unsuscribe();
        reject(new Error(`Request timed out for event ${eventName}`));
      }, 5000);

      const unsuscribe = this.resolveBus(eventName).on(
        responseEventName,
        (response: EventContractMap[Name]['response']) => {
          unsuscribe();
          clearTimeout(timeout);
          resolve(response);
        },
      );

      this.resolveBus(eventName).emit(eventName, {
        payload,
        respondTo: responseEventName,
      });
    });
  }

  async onRequest<Name extends RequestName>(
    eventName: Name,
    listener: (
      event: RequestContractMap[Name]['payload'],
    ) => Promise<RequestContractMap[Name]['response']>,
  ) {
    this.resolveBus(eventName).on<
      RequestContractMap[Name]['payload'] & { respondTo: string }
    >(eventName, async (payload) => {
      const response = await listener(payload);

      this.resolveBus(eventName).emit(payload.respondTo, response);
    });
  }
}
