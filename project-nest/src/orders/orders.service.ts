import { Injectable } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { ReqCreateOrdersDto } from './dto/req-create-orders.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  async createOrders(dto: ReqCreateOrdersDto) {
    const ticket: Ticket = await Ticket.findOne({
      where: { id: dto.ticketId },
    });
    const result: Order[] = [];
    for (const key of Object.keys(dto.orders)) {
      const product: Product = await Product.findOne({
        where: { id: key },
      });
      const order: Order = new Order();
      order.ticket = ticket;
      order.product = product;
      order.quantity = dto.orders[key];
      result.push(await Order.save(order));
    }
    return result;
  }

  async findOrdersByTicketId(ticketId: string) {
    const orders: Order[] = await Order.find({
      where: { ticketId },
    });
    return orders;
  }

  async findOrdersByMarketId(marketId: string) {
    const tickets: Ticket[] = await Ticket.find({
      where: { marketId },
    });
    const result: Order[] = [];
    for (const ticket of tickets) {
      const order = await Order.findOne({
        where: { ticketId: ticket.id },
      });
      result.push(order);
    }
    return result;
  }
}
