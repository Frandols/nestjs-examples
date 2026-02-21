import { bootstrap } from '@app/bootstrap';
import { Module } from '@nestjs/common';
import topologyConfig from '@topologies/split-notifications/topology.config';

@Module({
  imports: [...topologyConfig.apps.notifications.modules],
})
export class AppModule {}

bootstrap(AppModule, 3001);
