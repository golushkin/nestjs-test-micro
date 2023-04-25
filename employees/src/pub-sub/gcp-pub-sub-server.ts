import { Message, PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { TopicNamesEnum } from '../shared/enums/topic-names.enum';

export class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  private pubSub: PubSub; // TODO: move to provider and inject in client & server
  private projectId: string;
  private topicId: string;

  constructor(configService: ConfigService) {
    super();
    this.projectId = configService.getOrThrow('GOOGLE_PROJECT_ID');
    this.topicId = configService.getOrThrow('GOOGLE_PUB_SUB_TOPIC');
  }

  async listen(callback: () => void) {
    const subscriptionId = 'my-sub';
    this.pubSub = new PubSub({ projectId: this.projectId });
    const [topic] = await this.pubSub
      .topic(this.topicId)
      .get({ autoCreate: true });
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
