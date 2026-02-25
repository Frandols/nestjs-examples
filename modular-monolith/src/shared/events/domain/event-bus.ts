export interface EventBus {
  emit<T>(eventName: string, event: T): void;
  on<T>(eventName: string, listener: (event: T) => void): () => void;
}
