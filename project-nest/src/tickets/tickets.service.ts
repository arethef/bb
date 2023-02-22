import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor() {}
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
}
