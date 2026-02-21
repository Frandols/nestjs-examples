import { DynamicModule, Type } from '@nestjs/common';

export {};

declare global {
  interface AppConfig {
    modules: (Type<any> | DynamicModule | Promise<DynamicModule>)[];
  }

  interface TopologyConfig {
    apps: Record<string, AppConfig>;
  }
}
