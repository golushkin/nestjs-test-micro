import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '@google-cloud/pubsub';
import { TopicNamesEnum } from '../../shared/enums/topic-names.enum';
import { EmployeeMsgService } from '../services/employee-msg.service';

@Controller()
export class EmployeeMsgController {
  constructor(private readonly employeeService: EmployeeMsgService) {}

  @EventPattern(TopicNamesEnum.MY_TOPIC)
  async assignOrder(msg: Message): Promise<void> {
    await this.employeeService.assignOrder(msg);
  }
}
