import { Module } from '@nestjs/common';
import { EmployeeHttpController } from './controllers/employee.http-controller';
import { EmployeeHttpService } from './services/employee-http.service';
import { EmployeeEntityProvider } from './providers/employee.provider';
import { EmployeeMsgController } from './controllers/employee.msg-controller';
import { OrderEntityProvider } from './providers/orders.provider';
import { EmployeeMsgService } from './services/employee-msg.service';

@Module({
  controllers: [EmployeeHttpController, EmployeeMsgController],
  providers: [
    EmployeeHttpService,
    EmployeeMsgService,
    EmployeeEntityProvider,
    OrderEntityProvider,
  ],
})
export class EmployeeModule {}
