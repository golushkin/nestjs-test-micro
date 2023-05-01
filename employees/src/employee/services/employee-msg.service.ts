import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_ENTITY_PROVIDER } from '../providers/employee.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { EmployeeEntity } from '../entities/employees.entity';
import { Message } from '@google-cloud/pubsub';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';
import { WsController } from '../../ws/ws.controller';
import { MessageDto } from '../dto/message.dto';
import { OrderStatusEnum } from '../enums/order-status.enum';
import { MicroServicesEnum } from '../enums/microservices.enum';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventNamesEnum } from '../enums/event-names.enum';

@Injectable()
export class EmployeeMsgService {
  constructor(
    @Inject(EMPLOYEE_ENTITY_PROVIDER)
    private readonly employeeCollection: CollectionReference<EmployeeEntity>,
    @Inject(MicroServicesEnum.ORDER)
    private readonly orderServcie: ClientProxy,
    private readonly wsController: WsController,
    private readonly configService: ConfigService,
  ) {}

  async assignOrder(message: Message): Promise<void> {
    const { orderId }: MessageDto = JSON.parse(message.data.toString());
    const topicId = this.configService.getOrThrow('GOOGLE_PUB_SUB_TOPIC_ORDER');
    const [employees] = await Promise.all([
      this.employeeCollection
        .where('status', '==', EmployeeStatusEnum.FREE)
        .get(),
      this.orderServcie.emit(topicId, {
        event: EventNamesEnum.ORDER_UPDATE,
        status: OrderStatusEnum.PROCESSING,
        orderId,
      }),
    ]);

    if (!employees.size) {
      return;
    }

    const userIds = this.wsController.getAllEmployeesId();

    if (!userIds.length) {
      return;
    }

    const connectedFreeEmployees: string[] = [];

    for (const employee of employees.docs) {
      if (userIds.includes(employee.id)) {
        connectedFreeEmployees.push(employee.id);
      }
    }

    if (!connectedFreeEmployees.length) {
      return;
    }

    const [employeeId] = connectedFreeEmployees;
    await Promise.all([
      this.orderServcie.emit(topicId, {
        event: EventNamesEnum.ORDER_UPDATE,
        orderId,
        status: OrderStatusEnum.DELIVERING,
        employeeId,
      }),
      this.employeeCollection
        .doc(employeeId)
        .update({ status: EmployeeStatusEnum.BUSY, orderId }),
    ]);

    this.wsController.assignOrder(orderId, employeeId);
    message.ack();
  }
}
