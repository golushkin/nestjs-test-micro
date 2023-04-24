import { PubSub } from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

@Injectable()
export class GoogleCloudPubSubClient extends ClientProxy {
  private pubSub: PubSub;

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async connect(): Promise<PubSub> {
    if (this.pubSub) {
      return this.pubSub;
    }

    const projectId = this.configService.getOrThrow('GOOGLE_PROJECT_ID');
    this.pubSub = new PubSub({ projectId });

    return this.pubSub;
  }

  async close(): Promise<void> {
    await this.pubSub.close();
  }

  protected publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }

  protected async dispatchEvent<T = any>(packet: ReadPacket<any>): Promise<T> {
    const { pattern, data } = packet;
    const [topic] = await this.pubSub.topic(pattern).get({ autoCreate: true });

    return (await topic.publishMessage({ json: data })) as unknown as T;
  }
}
