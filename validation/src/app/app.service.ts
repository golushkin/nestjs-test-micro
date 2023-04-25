import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ORDER_PROVIDER } from './providers/orders.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderEntity } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { generateId } from '../utils/id';
import { OrderStatusEnum } from './enums/order-status.enum';
import { GoogleCloudPubSubClient } from '../pub-sub/gcp-pub-sub-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly ordersCollection: CollectionReference<OrderEntity>,
    private readonly pubSub: GoogleCloudPubSubClient,
    private readonly configService: ConfigService,
  ) {}

  async createOder(info: CreateOrderDto, userId: string): Promise<OrderEntity> {
    const order: OrderEntity = {
      _id: generateId(),
      status: OrderStatusEnum.CREATED,
      ...info,
      userId,
    };
    await this.ordersCollection.doc(order._id).set(order);
    const topicId = this.configService.getOrThrow('GOOGLE_PUB_SUB_TOPIC');
    await this.pubSub.emit(topicId, { orderId: order._id });

    return order;
  }
}
