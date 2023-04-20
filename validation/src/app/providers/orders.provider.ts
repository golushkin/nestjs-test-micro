import { Provider } from '@nestjs/common';
import { FIRESTORE_PROVIDER } from '../../database/firestore.provider';
import { Firestore } from '@google-cloud/firestore';

export const ORDER_PROVIDER = Symbol('ORDER_PROVIDER');

export const OrderProvider: Provider = {
  provide: ORDER_PROVIDER,
  useFactory: (db: Firestore) => db.collection('orders'),
  inject: [FIRESTORE_PROVIDER],
};
