import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrderProvider } from './providers/orders.provider';
import { ClientsModule } from '@nestjs/microservices';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([EmployeeService]),
  ],
  controllers: [AppController],
  providers: [AppService, OrderProvider],
})
export class AppModule {}

// https://docs.nestjs.com/microservices/custom-transport
// https://www.youtube.com/watch?v=C250DCwS81Q
