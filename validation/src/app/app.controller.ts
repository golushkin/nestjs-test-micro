import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderEntity } from './entities/orders.entity';
import { ContainUserIdGuard } from './guards/contain-user-id.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';

@Controller('orders')
@UseGuards(ContainUserIdGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(
    @Body() info: CreateOrderDto,
    @Req() req: Request,
  ): Promise<OrderEntity> {
    const userId = req.headers['x-user-id'] as string;
    return await this.appService.createOder(info, userId);
  }
}
