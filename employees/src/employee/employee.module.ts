import { Module } from '@nestjs/common';
import { EmployeeHttpController } from './controllers/employee.http-controller';
import { EmployeeService } from './employee.service';
import { DatabaseModule } from '../database/database.module';
import { EmployeeEntityProvider } from './providers/employee.provider';
import { EmployeeMsgController } from './controllers/employee.msg-controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeHttpController, EmployeeMsgController],
  providers: [EmployeeService, EmployeeEntityProvider],
})
export class EmployeeModule {}
