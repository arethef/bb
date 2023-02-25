import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
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
  @Get('market-detail/:marketId')
  async loadMarketDetailTableTickets(
    @Req() req,
    @Param('marketId') marketId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.ticketsService.loadMarketDetailTableTickets(
      marketId,
    );
    return result;
  }
}
