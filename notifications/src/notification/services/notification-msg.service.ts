import { Injectable } from '@nestjs/common';
import { Message } from '@google-cloud/pubsub';
import { WsGateway } from '../../ws/ws.gateway';
import { UpdateOrderMsgDto } from '../dto/udpate-oder-msg.dto';

@Injectable()
export class NotificationMsgService {
  constructor(private readonly wsGateway: WsGateway) {}

  async updateOrder(message: Message): Promise<void> {
    const data: UpdateOrderMsgDto = JSON.parse(message.data.toString());
    const { userId } = data;

    this.wsGateway.updateOrder(userId);
    message.ack();
  }
}
