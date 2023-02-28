import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ReqCreateOrdersDto } from './dto/req-create-orders.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createOrders(
    @Req() req,
    @Body() dto: ReqCreateOrdersDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [orders.controller.ts] createOrders() ++++++`);
    console.log(`❯❯❯❯❯❯ [orders.controller.ts] createOrders() dto:`, dto);
    const result = await this.ordersService.createOrders(dto);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-ticket-detail-order-list/:ticketId')
  async loadCustomerTicketDetailOrders(
    @Req() req,
    @Param('ticketId') ticketId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Order[]> {
    const result = await this.ordersService.findOrdersByTicketId(ticketId);
    return result;
  }
}
