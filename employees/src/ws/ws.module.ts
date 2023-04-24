import { Module } from '@nestjs/common';
import { WsController } from './ws.controller';
import { WsService } from './ws.service';

@Module({ providers: [WsController, WsService], exports: [WsController] })
export class WsModule {}
