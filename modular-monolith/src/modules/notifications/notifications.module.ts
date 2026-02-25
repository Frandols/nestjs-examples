import { NotificationEntity } from '@modules/notifications/notification.entity';
import { NotificationsListener } from '@modules/notifications/notifications.listener';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationsListener],
  exports: [NotificationsListener],
})
export class NotificationsModule {}
