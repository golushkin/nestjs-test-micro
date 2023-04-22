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

@Injectable()
export class AppService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly orders: CollectionReference<OrderEntity>,
  ) {}

  async createOder(info: CreateOrderDto, userId: string): Promise<OrderEntity> {
    const docId = generateId();
    const docRef = this.orders.doc(docId);
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

    return order;
  }
}
