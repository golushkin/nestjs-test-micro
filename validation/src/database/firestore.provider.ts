import { Firestore } from '@google-cloud/firestore';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const FIRESTORE_PROVIDER = Symbol('FIRESTORE_PROVIDER');

export const FireStoreProvider: Provider = {
  provide: FIRESTORE_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const projectId = configService.getOrThrow('GOOGLE_PROJECT_ID');

    return new Firestore({ projectId });
  },
};
