import { PubSub } from '@google-cloud/pubsub';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class GoogleCloudPubSubClient extends ClientProxy {
  private pubSub: PubSub;
  private projectId: string;

  constructor(options: Record<string, any>) {
    super();

    if (!options['projectId']) {
      throw new Error('projectId is not provided');
    }

    this.projectId = options['projectId'];
  }

  async connect(): Promise<PubSub> {
    if (this.pubSub) {
      return this.pubSub;
    }

    this.pubSub = new PubSub({ projectId: this.projectId });

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
