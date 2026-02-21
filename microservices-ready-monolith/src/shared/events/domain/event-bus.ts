export abstract class EventBus {
  abstract emit<T = any>(eventName: string, event: T): void;

  abstract on<T = any>(eventName: string, listener: (event: T) => void): void;

  async request<R = any, T = any>(eventName: string, payload: T): Promise<R> {
    const responseEventName = `${eventName}.response.${crypto.randomUUID()}`;

    return new Promise<R>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Request timed out for event ${eventName}`));
      }, 5000);

      this.on(responseEventName, (response: R) => {
        clearTimeout(timeout);
        resolve(response);
      });

      this.emit(eventName, {
        payload,
        respondTo: responseEventName,
      });
    });
  }
}
