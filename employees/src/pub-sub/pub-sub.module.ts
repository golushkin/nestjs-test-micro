import { Module } from '@nestjs/common';
import { GoogleCloudPubSubClient } from './gcp-pub-sub-client';
import { GoogleCloudPubSubServer } from './gcp-pub-sub-server';

@Module({
  providers: [GoogleCloudPubSubClient, GoogleCloudPubSubServer],
  exports: [GoogleCloudPubSubClient, GoogleCloudPubSubServer],
})
export class PubSubModule {}
