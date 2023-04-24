import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { WsEventsEnum } from './enums/ws-event.enum';
import { WsClient } from './ws-client';

@WebSocketGateway()
export class WsController {
  constructor(private readonly wsService: WsService) {}

  @SubscribeMessage(WsEventsEnum.ECHO)
  pong(@MessageBody() msg: any, @ConnectedSocket() client: WsClient) {
    this.wsService.pong(client, msg);
  }
}
