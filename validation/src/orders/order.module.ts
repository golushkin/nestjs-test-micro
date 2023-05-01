import { Module } from '@nestjs/common';
import { OrderHttpController } from './controllers/order-http.controller';
import { OrderHttpService } from './services/order-http.service';
import { OrderProvider } from './providers/orders.provider';
import { ClientsModule } from '@nestjs/microservices';
import { EmployeeService } from './microservices/employee.microservice';
import { OrderMsgService } from './services/order-msg.service';
import { OrderMsgController } from './controllers/order-msg.controller';
import { NotificationMicroService } from './microservices/notification.microservice';

@Module({
  imports: [
    ClientsModule.registerAsync([EmployeeService, NotificationMicroService]),
  ],
  controllers: [OrderHttpController, OrderMsgController],
  providers: [OrderHttpService, OrderMsgService, OrderProvider],
})
export class OrderModule {}
