import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrderProvider } from './providers/orders.provider';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
  imports: [
    DatabaseModule,
    PubSubModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, OrderProvider],
})
export class AppModule {}

// https://docs.nestjs.com/microservices/custom-transport
// https://www.youtube.com/watch?v=C250DCwS81Q
