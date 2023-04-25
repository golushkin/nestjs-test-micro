import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_ENTITY_PROVIDER } from '../providers/employee.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { EmployeeEntity } from '../entities/employees.entity';
import { ORDER_ENTITY_PROVIDER } from '../providers/orders.provider';
import { OrderEntity } from '../entities/orders.entity';
import { Message } from '@google-cloud/pubsub';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';
import { WsController } from '../../ws/ws.controller';
import { MessageDto } from '../dto/message.dto';
import { OrderStatusEnum } from '../enums/order-status.enum';

@Injectable()
export class EmployeeMsgService {
  constructor(
    @Inject(EMPLOYEE_ENTITY_PROVIDER)
    private readonly employeeCollection: CollectionReference<EmployeeEntity>,
    @Inject(ORDER_ENTITY_PROVIDER)
    private readonly orderCollection: CollectionReference<OrderEntity>,
    private readonly wsController: WsController,
  ) {}

  async assignOrder(message: Message): Promise<void> {
    const { orderId }: MessageDto = JSON.parse(message.data.toString());
    const [employees] = await Promise.all([
      this.employeeCollection
        .where('status', '==', EmployeeStatusEnum.FREE)
        .get(),
      this.orderCollection
        .doc(orderId)
        .update({ status: OrderStatusEnum.PROCESSING }),
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
      this.orderCollection
        .doc(orderId)
        .update({ employeeId, status: OrderStatusEnum.DELIVERING }),
      this.employeeCollection
        .doc(employeeId)
        .update({ status: EmployeeStatusEnum.BUSY }),
    ]);

    this.wsController.assignOrder(orderId, employeeId);
    message.ack();
  }
}
