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
    const docId = generateId();
    const docRef = this.ordersCollection.doc(docId);
    await docRef.set({
      ...info,
      _id: docId,
      userId,
      status: OrderStatusEnum.CREATED,
    });

    const doc = await docRef.get();
    const order = doc.data();

    if (!order) {
      throw new InternalServerErrorException();
    }

    const topicId = this.configService.getOrThrow('GOOGLE_PUB_SUB_TOPIC');
    await this.pubSub.emit(topicId, { test: 1 });

    return order;
  }
}
