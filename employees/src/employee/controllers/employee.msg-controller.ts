import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Message } from '@google-cloud/pubsub';
import { EventNamesEnum } from '../enums/event-names.enum';
import { EmployeeMsgService } from '../services/employee-msg.service';

@Controller()
export class EmployeeMsgController {
  constructor(private readonly employeeService: EmployeeMsgService) {}

  @EventPattern(EventNamesEnum.ORDER_CREATED)
  async assignOrder(msg: Message): Promise<void> {
    await this.employeeService.assignOrder(msg);
  }
}
