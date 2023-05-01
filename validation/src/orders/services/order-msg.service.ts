import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PROVIDER } from '../providers/orders.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderEntity } from '../entities/orders.entity';
import { UpdateOrderMsgDto } from '../dto/update-order-msg.dto';
import { Message } from '@google-cloud/pubsub';
import { MicroServicesEnum } from '../enums/microservices.enum';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventNamesEnum } from '../enums/event-names.enum';

@Injectable()
export class OrderMsgService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly ordersCollection: CollectionReference<OrderEntity>,
    @Inject(MicroServicesEnum.NOTIFICATION)
    private readonly notificationMicroService: ClientProxy,
    private readonly configService: ConfigService,
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

    const topicId = this.configService.getOrThrow(
      'GOOGLE_PUB_SUB_TOPIC_NOTIFICATION',
    );
    this.notificationMicroService.emit(topicId, {
      event: EventNamesEnum.ORDER_UPDATE,
      userId: order.userId,
    });
    message.ack();
  }
}
