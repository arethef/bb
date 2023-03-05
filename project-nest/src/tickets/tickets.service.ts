import { Injectable } from '@nestjs/common';
import { Address } from 'src/addresses/entities/address.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Place } from 'src/places/entities/place.entity';
import { ReqCreateTicketDto } from './dto/req-create-ticket.dto';
import { ResBrandMarketDetailTableTicketDto } from './dto/res-brand-market-detail-table-ticket.dto';
import { ResBrandTableTicketDto } from './dto/res-brand-table-ticket.dto';
import { ResCustomerTableTicketDto } from './dto/res-customer-table-ticket.dto';
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

  async loadBrandMarketDetailTickets(
    marketId: string,
  ): Promise<ResBrandMarketDetailTableTicketDto[]> {
    const tickets: Ticket[] = await Ticket.find({
      where: { marketId },
    });
    const result: ResBrandMarketDetailTableTicketDto[] = [];
    for (const t of tickets) {
      result.push({
        ticket: {
          id: t.id,
          un: t.un,
          customer: {
            nickname: t.customer.nickname,
          },
          totalQuantity: t.totalQuantity,
          totalPrice: t.totalPrice,
        },
      });
    }
    return result;
  }

  async brandFindTicketsByUserId(userId: string): Promise<Ticket[]> {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const tickets: Ticket[] = await Ticket.find({
      where: { brandId: brand.id },
    });
    return tickets;
  }
  async loadBrandAllTableTickets(
    userId: string,
  ): Promise<ResBrandTableTicketDto[]> {
    const tickets = await this.brandFindTicketsByUserId(userId);
    const result: ResBrandTableTicketDto[] = [];
    for (const t of tickets) {
      result.push({
        ticket: {
          id: t.id,
          un: t.un,
          createdAt: t.createdAt,
          customer: {
            nickname: t.customer.nickname,
          },
          totalQuantity: t.totalQuantity,
          totalPrice: t.totalPrice,
          deliveryStatus: t.deliveryStatus,
        },
      });
    }
    return result;
  }

  async customerFindTicketsByUserId(userId: string): Promise<Ticket[]> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const tickets: Ticket[] = await Ticket.find({
      where: { customerId: customer.id },
    });
    return tickets;
  }
  async loadCustomerTickets(userId: string): Promise<Ticket[]> {
    const result = await this.customerFindTicketsByUserId(userId);
    return result;
  }

  async findTicketByTicketId(id: string): Promise<Ticket> {
    const ticket = await Ticket.findOne({
      where: { id },
    });
    return ticket;
  }

  async createTicket(dto: ReqCreateTicketDto, userId: string): Promise<Ticket> {
    console.log(`++++++ [tickets.service.ts] createTicket() ++++++`);
    console.log(`❯❯❯❯❯❯ [tickets.service.ts] createTicket() dto:`, dto);

    const ticket: Ticket = new Ticket();
    const customer: Customer = await Customer.findOne({ where: { userId } });
    // const brand: Brand = await Brand.findOne({
    //   where: { id: dto.ticket.brandId },
    // });
    const market: Market = await Market.findOne({
      where: { id: dto.ticket.marketId },
    });
    ticket.un = ticket.generateUN();
    ticket.customer = customer;
    ticket.customerId = customer.id;
    // ticket.brand = brand;
    // ticket.brandId = dto.ticket.brandId;
    ticket.brand = market.brand;
    ticket.market = market;
    ticket.totalQuantity = dto.ticket.totalQuantity;
    ticket.totalPrice = dto.ticket.totalPrice;
    ticket.deliveryFreeApply = dto.ticket.deliveryFreeApply;
    ticket.deliveryAddress = dto.ticket.deliveryAddress;
    // const place: Place = await Place.findOne({
    //   where: { id: dto.place.id },
    // });
    // ticket.place = place;
    // const address: Address = await Address.findOne({
    //   where: { id: dto.address.id },
    // });
    // ticket.address = address;
    const result = await Ticket.save(ticket);
    return result;
  }
}
