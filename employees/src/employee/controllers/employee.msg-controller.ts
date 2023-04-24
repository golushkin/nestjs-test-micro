import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Message } from '@google-cloud/pubsub';
import { TopicNamesEnum } from '../../shared/enums/topic-names.enum';

@Controller()
export class EmployeeMsgController {
  @MessagePattern(TopicNamesEnum.MY_TOPIC)
  async test(msg: Message): Promise<void> {
    console.log('test-msg', JSON.parse(msg.data.toString()));
  }
}
