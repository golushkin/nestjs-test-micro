import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import { WsEventsEnum } from './enums/ws-event.enum';
import { WsClient } from './ws-client';
import { WsMessageDto } from './dto/ws-message.dto';

@WebSocketGateway()
export class WsGateway {
  @WebSocketServer()
  private server: Server<WsClient>;

  private send(userId: string, msg: WsMessageDto): void {
    for (const client of this.server.clients) {
      if (client.userId === userId) {
        client.send(JSON.stringify(msg));
        break;
      }
    }
  }

  updateOrder(userId: string): void {
    this.send(userId, { event: WsEventsEnum.UPDATE_ORDER });
  }
}
