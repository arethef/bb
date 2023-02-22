import { Controller, Get, Req, Res } from '@nestjs/common';
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
}
