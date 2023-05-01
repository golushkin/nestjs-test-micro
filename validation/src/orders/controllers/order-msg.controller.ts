import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventNamesEnum } from '../enums/event-names.enum';
import { Message } from '@google-cloud/pubsub';
import { OrderMsgService } from '../services/order-msg.service';

@Controller()
export class OrderMsgController {
  constructor(private readonly orderService: OrderMsgService) {}

  @EventPattern(EventNamesEnum.ORDER_UPDATE)
  async update(message: Message): Promise<void> {
    return await this.orderService.update(message);
  }
}
