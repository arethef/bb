import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Image } from 'src/images/entities/image.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { ReqCreateMarketDto } from './dto/req-create-market.dto';
import { Market } from './entities/market.entity';
import { ResBrandTableMarketDto } from './dto/res-brand-table-market.dto';
import { ResBrandProductDetailMarketDto } from './dto/res-brand-product-detail-table.dto';
import { ResCustomerCardMarketDto } from './dto/res-customer-card-market.dto';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class MarketsService {
  async createMarket(userId: string, dto: ReqCreateMarketDto) {
    const market: Market = new Market();
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    market.un = market.generateUN();
    market.brand = brand;
    market.title = dto.market.title;
    market.content = dto.market.content;
    const image: Image = await Image.findOne({
      where: { id: dto.image.id },
    });
    market.image = image;
    market.deliveryFee = dto.market.deliveryFee;
    market.deliveryFeeAdded = dto.market.deliveryFeeAdded;
    market.deliveryFree = dto.market.deliveryFee;
    market.minimumQuantity = dto.market.minimumQuantity;
    const openDateTime = new Date(
      `${dto.market.openDate}T${dto.market.openTime}:00`,
    );
    market.openDateTime = openDateTime;
    const closeDateTime = new Date(
      `${dto.market.closeDate}T${dto.market.closeTime}:00`,
    );
    market.closeDateTime = closeDateTime;
    const result = await Market.save(market);
    return result;
  }

  async findMarketByMarketId(id: string) {
    const market: Market = await Market.findOne({
      where: { id },
    });
    return market;
  }

  async findMarketsByUserId(userId: string): Promise<Market[]> {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const markets: Market[] = await Market.find({
      where: { brandId: brand.id },
    });
    return markets;
  }

  async loadBrandAllTableMarkets(
    userId: string,
  ): Promise<ResBrandTableMarketDto[]> {
    const markets = await this.findMarketsByUserId(userId);
    const result: ResBrandTableMarketDto[] = [];
    for (const market of markets) {
      let totalNumberOfPreparations = 0;
      let totalPriceSoldOut = 0;
      const lineups: Lineup[] = await Lineup.find({
        where: { marketId: market.id },
      });
      for (const lineup of lineups) {
        totalNumberOfPreparations += lineup.quantity;
        totalPriceSoldOut += lineup.quantity * lineup.product.price;
      }
      let totalNumberOfSales = 0;
      let totalPriceSelling = 0;
      const tickets: Ticket[] = await Ticket.find({
        where: { marketId: market.id },
      });
      for (const ticket of tickets) {
        const orders: Order[] = await Order.find({
          where: { ticketId: ticket.id },
        });
        for (const order of orders) {
          totalNumberOfSales += order.quantity;
          totalPriceSelling += order.quantity * order.product.price;
        }
      }
      result.push({
        market: {
          id: market.id,
          un: market.un,
          title: market.title,
          openDateTime: market.openDateTime,
          closeDateTime: market.closeDateTime,
        },
        totalNumberOfPreparations,
        totalPriceSoldOut,
        totalNumberOfSales,
        totalPriceSelling,
        totalNumberOfTickets: tickets.length,
        done: Date.now() < market.closeDateTime.getTime() ? false : true,
      });
    }
    return result;
  }

  async loadBrandProductDetailMarkets(
    productId: string,
  ): Promise<ResBrandProductDetailMarketDto[]> {
    const lineups = await Lineup.find({
      where: { productId },
    });
    const result: ResBrandProductDetailMarketDto[] = [];
    for (const lineup of lineups) {
      const totalNumberOfTickets = await Ticket.count({
        where: { marketId: lineup.marketId },
      });
      result.push({
        market: {
          id: lineup.market.id,
          un: lineup.market.un,
          title: lineup.market.title,
          openDateTime: lineup.market.openDateTime,
          closeDateTime: lineup.market.closeDateTime,
        },
        totalNumberOfTickets,
        done: Date.now() < lineup.market.closeDateTime.getTime() ? false : true,
      });
    }
    return result;
  }

  async findMarkets(): Promise<Market[]> {
    const markets = await Market.find();
    return markets;
  }

  async loadCustomerAllCardsMarketsLatest(): Promise<
    ResCustomerCardMarketDto[]
  > {
    const markets = await this.findMarkets();
    const result: ResCustomerCardMarketDto[] = [];
    for (const market of markets) {
      result.push({
        market: {
          id: market.id,
          title: market.title,
          closeDateTime: market.closeDateTime,
          brand: {
            businessName: market.brand.businessName,
          },
          image: {
            url: market.image.url,
          },
        },
      });
    }
    return result;
  }

  async loadCustomerBrandDetailMarkets(brandId: string): Promise<Market[]> {
    const markets = await Market.find({
      where: { brandId },
    });
    return markets;
  }
}
