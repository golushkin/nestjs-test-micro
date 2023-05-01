import { EventNamesEnum } from '../enums/event-names.enum';

export class UpdateOrderMsgDto {
  userId: string;
  event: EventNamesEnum;
}
