import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderEntity } from '../entities/orders.entity';
import { ContainUserIdGuard } from '../guards/contain-user-id.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Request } from 'express';
import { OrderHttpService } from '../services/order-http.service';

@Controller('orders')
@UseGuards(ContainUserIdGuard)
export class OrderHttpController {
  constructor(private readonly orderService: OrderHttpService) {}

  @Post()
  async create(
    @Body() info: CreateOrderDto,
    @Req() req: Request,
  ): Promise<OrderEntity> {
    const userId = req.headers['x-user-id'] as string;
    return await this.orderService.createOder(info, userId);
  }
}
