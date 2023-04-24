import { Module } from '@nestjs/common';
import { GoogleCloudPubSubClient } from './gcp-pub-sub-client';

@Module({
  providers: [GoogleCloudPubSubClient],
  exports: [GoogleCloudPubSubClient],
})
export class PubSubModule {}
