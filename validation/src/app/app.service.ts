import { Inject, Injectable } from '@nestjs/common';
import { ORDER_PROVIDER } from './providers/orders.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderEntity } from './entities/orders.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject(ORDER_PROVIDER)
    private readonly orders: CollectionReference<OrderEntity>,
  ) {}
}
