import { Provider } from '@nestjs/common';
import { FIRESTORE_PROVIDER } from '../../database/firestore.provider';
import { Firestore } from '@google-cloud/firestore';

export const ORDER_ENTITY_PROVIDER = Symbol('ORDER_ENTITY_PROVIDER');

export const OrderEntityProvider: Provider = {
  provide: ORDER_ENTITY_PROVIDER,
  useFactory: (db: Firestore) => db.collection('orders'),
  inject: [FIRESTORE_PROVIDER],
};
