import { EmployeeStatusEnum } from '../enums/employee-status.enum';

export class EmployeeEntity {
  _id: string;
  firstName: string;
  lastName: string;
  status: EmployeeStatusEnum;
  orderId?: string;
}
