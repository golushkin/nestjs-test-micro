import { Provider } from '@nestjs/common';
import { FIRESTORE_PROVIDER } from '../../database/firestore.provider';
import { Firestore } from '@google-cloud/firestore';
import { CollectionNamesEnum } from '../../shared/enums/collection-names.enum';

export const EMPLOYEE_ENTITY_PROVIDER = Symbol('EMPLOYEE_ENTITY_PROVIDER');

export const EmployeeEntityProvider: Provider = {
  provide: EMPLOYEE_ENTITY_PROVIDER,
  useFactory: (db: Firestore) => db.collection(CollectionNamesEnum.EMPLOYEES),
  inject: [FIRESTORE_PROVIDER],
};
