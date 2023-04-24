import { Module } from '@nestjs/common';
import { FireStoreProvider } from './firestore.provider';

@Module({ providers: [FireStoreProvider], exports: [FireStoreProvider] })
export class DatabaseModule {}
