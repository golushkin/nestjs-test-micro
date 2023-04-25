import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderEntity } from './entities/orders.entity';
import { ContainUserIdGuard } from './guards/contain-user-id.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(ContainUserIdGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() info: CreateOrderDto,
    @Req() req: Request,
  ): Promise<OrderEntity> {
    const userId = req.headers['x-user-id'] as string;
    return await this.orderService.createOder(info, userId);
  }
}
