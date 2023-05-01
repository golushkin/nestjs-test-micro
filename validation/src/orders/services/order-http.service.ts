import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PROVIDER } from '../providers/orders.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderEntity } from '../entities/orders.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { generateId } from '../../utils/id';
import { OrderStatusEnum } from '../enums/order-status.enum';
import { ConfigService } from '@nestjs/config';
import { MicroServicesEnum } from '../enums/microservices.enum';
import { ClientProxy } from '@nestjs/microservices';
import { EventNamesEnum } from '../enums/event-names.enum';

@Injectable()
export class OrderHttpService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly ordersCollection: CollectionReference<OrderEntity>,
    @Inject(MicroServicesEnum.EMPLOYEE)
    private readonly employeeService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async createOder(info: CreateOrderDto, userId: string): Promise<OrderEntity> {
    const order: OrderEntity = {
      _id: generateId(),
      status: OrderStatusEnum.CREATED,
      ...info,
      userId,
      employeeId: null,
    };
    await this.ordersCollection.doc(order._id).set(order);
    const topicId = this.configService.getOrThrow(
      'GOOGLE_PUB_SUB_TOPIC_EMPLOYEE',
    );
    await this.employeeService.emit(topicId, {
      event: EventNamesEnum.ORDER_CREATED,
      orderId: order._id,
    });

    return order;
  }
}
