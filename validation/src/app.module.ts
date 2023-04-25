import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OrderModule,
  ],
})
export class AppModule {}

// https://docs.nestjs.com/microservices/custom-transport
// https://www.youtube.com/watch?v=C250DCwS81Q
