import { Global, Module } from '@nestjs/common';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';

@Global()
@Module({ providers: [WsController, WsService], exports: [WsController] })
export class WsModule {}
