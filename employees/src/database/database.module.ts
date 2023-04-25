import { Global, Module } from '@nestjs/common';
import { FireStoreProvider } from './firestore.provider';

@Global()
@Module({ providers: [FireStoreProvider], exports: [FireStoreProvider] })
export class DatabaseModule {}
