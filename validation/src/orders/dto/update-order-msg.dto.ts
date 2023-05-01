import { EventNamesEnum } from '../enums/event-names.enum';
import { OrderStatusEnum } from '../enums/order-status.enum';

export class UpdateOrderMsgDto {
  event: EventNamesEnum;
  orderId: string;
  status: OrderStatusEnum;
  employeeId?: string;
}
