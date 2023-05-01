import { Module } from '@nestjs/common';
import { EmployeeHttpController } from './controllers/employee.http-controller';
import { EmployeeHttpService } from './services/employee-http.service';
import { EmployeeEntityProvider } from './providers/employee.provider';
import { EmployeeMsgController } from './controllers/employee.msg-controller';
import { EmployeeMsgService } from './services/employee-msg.service';
import { ClientsModule } from '@nestjs/microservices';
import { OrderMicroService } from './microservices/order.microservice';

@Module({
  imports: [ClientsModule.registerAsync([OrderMicroService])],
  controllers: [EmployeeHttpController, EmployeeMsgController],
  providers: [EmployeeHttpService, EmployeeMsgService, EmployeeEntityProvider],
})
export class EmployeeModule {}
