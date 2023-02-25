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
}
