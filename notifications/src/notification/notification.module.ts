import { Module } from '@nestjs/common';
import { NotificationMsgService } from './services/notification-msg.service';
import { NotificationMsgController } from './controllers/notificaiton-msg.controller';

@Module({
  controllers: [NotificationMsgController],
  providers: [NotificationMsgService],
})
export class NotificationModule {}
