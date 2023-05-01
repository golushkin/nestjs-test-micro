import { OrderStatusEnum } from '../enums/order-status.enum';

export class OrderEntity {
  _id: string;
  status: OrderStatusEnum;
  price: string;
  name: string;
  userId: string;
  employeeId: string | null;
}
