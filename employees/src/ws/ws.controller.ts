import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { WsService } from './ws.service';
import { WsEventsEnum } from './enums/ws-event.enum';
import { WsClient } from './ws-client';

//TODO: rename controller to service & delete service
@WebSocketGateway()
export class WsController {
  @WebSocketServer()
  private server: Server<WsClient>;

  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage(WsEventsEnum.ECHO)
  pong(@MessageBody() msg: any, @ConnectedSocket() client: WsClient) {
    this.wsService.pong(client, msg);
  }

  getAllEmployeesId(): string[] {
    const ids: string[] = [];

    this.server.clients.forEach((client) => ids.push(client.userId));

    return ids;
  }

  assignOrder(orderId: string, userId: string): void {
    for (const client of this.server.clients) {
      if (client.userId === userId) {
        client.send(
          JSON.stringify({
            event: WsEventsEnum.ASSIGN_ORDER,
            data: { orderId },
          }),
        );
      }
    }
  }
}
