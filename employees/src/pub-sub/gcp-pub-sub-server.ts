import { Message, PubSub } from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { TopicNamesEnum } from '../shared/enums/topic-names.enum';

@Injectable()
export class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  private pubSub: PubSub;

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async listen(callback: () => void) {
    const projectId = this.configService.getOrThrow('GOOGLE_PROJECT_ID');
    const topicId = this.configService.getOrThrow('GOOGLE_PUB_SUB_TOPIC');
    const subscriptionId = this.configService.getOrThrow(
      'GOOGLE_PUB_SUB_SUBSCRIPTION',
    );
    this.pubSub = new PubSub({ projectId });
    const [topic] = await this.pubSub.topic(topicId).get({ autoCreate: true });
    const [subscription] = await topic
      .subscription(subscriptionId)
      .get({ autoCreate: true });

    subscription.on('message', async (message: Message) => {
      const handler = this.messageHandlers.get(TopicNamesEnum.MY_TOPIC);

      if (handler) {
        await handler(message);
      }
    });

    subscription.on('error', (error) => {
      console.error('Received error:', error);
    });

    callback();
  }

  async close() {
    await this.pubSub.close();
  }
}
