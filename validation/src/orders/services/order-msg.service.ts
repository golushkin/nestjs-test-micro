import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PROVIDER } from '../providers/orders.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderEntity } from '../entities/orders.entity';
import { UpdateOrderMsgDto } from '../dto/update-order-msg.dto';
import { Message } from '@google-cloud/pubsub';

@Injectable()
export class OrderMsgService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly ordersCollection: CollectionReference<OrderEntity>,
  ) {}

  async update(message: Message): Promise<void> {
    const data: UpdateOrderMsgDto = JSON.parse(message.data.toString());
    const { orderId, status, employeeId } = data;
    const orderRef = await this.ordersCollection.doc(orderId).get();

    if (!orderRef.exists) {
      message.ack();
      return;
    }

    const order = orderRef.data() as OrderEntity;

    if (order.status === status) {
      message.ack();
      return;
    }

    await this.ordersCollection
      .doc(orderId)
      .update({ status, employeeId: employeeId || null });
    message.ack();
  }
}
