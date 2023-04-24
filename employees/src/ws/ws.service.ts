import { Injectable } from '@nestjs/common';
import { WsClient } from './ws-client';

@Injectable()
export class WsService {
  pong(client: WsClient, msg: any) {
    client.send(JSON.stringify(msg));
  }
}
