import { Module } from '@nestjs/common';
import { EmployeeHttpController } from './controllers/employee.http-controller';
import { EmployeeHttpService } from './services/employee-http.service';
import { DatabaseModule } from '../database/database.module';
import { EmployeeEntityProvider } from './providers/employee.provider';
import { EmployeeMsgController } from './controllers/employee.msg-controller';
import { OrderEntityProvider } from './providers/orders.provider';
import { EmployeeMsgService } from './services/employee-msg.service';
import { WsModule } from '../ws/ws.module';

@Module({
  imports: [DatabaseModule, WsModule],
  controllers: [EmployeeHttpController, EmployeeMsgController],
  providers: [
    EmployeeHttpService,
    EmployeeMsgService,
    EmployeeEntityProvider,
    OrderEntityProvider,
  ],
})
export class EmployeeModule {}
