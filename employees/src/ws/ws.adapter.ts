import { WsAdapter } from '@nestjs/platform-ws';
import { WebSocketServer } from 'ws';
import { WsClient } from './ws-client';
import url from 'url';

export class WebSocketAdapter extends WsAdapter {
  bindClientConnect(
    server: WebSocketServer,
    callback: (client, req) => void,
  ): void {
    server.on('connection', (client: WsClient, req) => {
      const userId = url
        .parse(req.url as string, true)
        .query.userId?.toString();

      if (!userId) {
        client.close(1007, 'INVALID_USER_ID');
      }

      client.userId = userId as string;

      callback(client, req);
    });
  }
}
