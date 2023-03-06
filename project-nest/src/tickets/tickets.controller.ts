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
import { ReqCreateTicketDto } from './dto/req-create-ticket.dto';
import { ResBrandTableTicketDto } from './dto/res-brand-table-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('brand')
  async getBrandTickets(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log(`++++++ [tickets.controller.ts] getBrandTickets() ++++++`);
    console.log(`❯❯❯❯❯❯ req.user:`, req.user);

    // const result = await this.ticketsService.findTicketsByBrandId();
    const result = await this.ticketsService.findTicketsByBrandUserId(
      req.uesr.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('brand-market-detail-ticket-list/:marketId')
  async loadBrandMarketDetailTickets(
    @Req() req,
    @Param('marketId') marketId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.ticketsService.loadBrandMarketDetailTickets(
      marketId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('brand-ticket-list')
  async loadBrandAllTableTickets(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResBrandTableTicketDto[]> {
    const result = await this.ticketsService.loadBrandAllTableTickets(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-ticket-list')
  async loadCustomerTickets(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Ticket[]> {
    const result = await this.ticketsService.loadCustomerTickets(req.user.id);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('detail/:id')
  async detailTicket(
    @Req() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Ticket> {
    const result = await this.ticketsService.findTicketByTicketId(id);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('new')
  async createTicket(
    @Req() req,
    @Body() dto: ReqCreateTicketDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Ticket> {
    const result = await this.ticketsService.createTicket(dto, req.user.id);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('update/pay-status/fail/:id')
  async updatePayStatusFail(
    @Req() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Ticket> {
    const result = await this.ticketsService.updatePayStatusFail(id);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('update/pay-status/success/:id')
  async updatePayStatusSuccess(
    @Req() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Ticket> {
    const result = await this.ticketsService.updatePayStatusSuccess(id);
    return result;
  }
}
