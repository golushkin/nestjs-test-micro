import { WsEventsEnum } from '../enums/ws-event.enum';

export class WsMessageDto {
  event: WsEventsEnum;
  data?: any;
}
