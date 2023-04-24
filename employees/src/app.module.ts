import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { EmployeeModule } from './employee/employee.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    DatabaseModule,
    PubSubModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    WsModule,
  ],
})
export class AppModule {}

// https://docs.nestjs.com/microservices/custom-transport
// https://www.youtube.com/watch?v=C250DCwS81Q
