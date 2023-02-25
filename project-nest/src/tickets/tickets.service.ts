import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ResMarketDetailTableTicketDto } from './dto/res-market-detail-table-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  // async findTicketsByBrandId() {}
  async findTicketsByBrandUserId(userId: string) {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const tickets: Ticket[] = await Ticket.find({
      where: { brandId: brand.id },
    });
    return tickets;
  }

  async loadMarketDetailTableTickets(
    marketId: string,
  ): Promise<ResMarketDetailTableTicketDto[]> {
    const tickets: Ticket[] = await Ticket.find({
      where: { marketId },
    });
    const result: ResMarketDetailTableTicketDto[] = [];
    for (const t of tickets) {
      const resMarketdetailTableTicketDto: ResMarketDetailTableTicketDto =
        new ResMarketDetailTableTicketDto();
      resMarketdetailTableTicketDto.ticket.id = t.id;
      resMarketdetailTableTicketDto.ticket.un = t.un;
      resMarketdetailTableTicketDto.ticket.customer.nickname =
        t.customer.nickname;
      resMarketdetailTableTicketDto.ticket.totalQuantity = t.totalQuantity;
      resMarketdetailTableTicketDto.ticket.totalPrice = t.totalPrice;
      result.push(resMarketdetailTableTicketDto);
    }
    return result;
  }
}
