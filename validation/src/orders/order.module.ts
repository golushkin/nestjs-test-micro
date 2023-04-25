import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProvider } from './providers/orders.provider';
import { ClientsModule } from '@nestjs/microservices';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [ClientsModule.registerAsync([EmployeeService])],
  controllers: [OrderController],
  providers: [OrderService, OrderProvider],
})
export class OrderModule {}
