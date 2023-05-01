import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '@google-cloud/pubsub';
import { NotificationMsgService } from '../services/notification-msg.service';
import { EventNamesEnum } from '../enums/event-names.enum';

@Controller()
export class NotificationMsgController {
  constructor(private readonly notificaitonService: NotificationMsgService) {}

  @EventPattern(EventNamesEnum.ORDER_UPDATE)
  async updateOrder(message: Message): Promise<void> {
    return await this.notificaitonService.updateOrder(message);
  }
}
