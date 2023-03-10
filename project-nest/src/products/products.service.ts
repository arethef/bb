import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Image } from 'src/images/entities/image.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Like } from 'typeorm';
import { ReqCreateProductDto } from './dto/req-create-product.dto';
import { ResBrandMarketNewProductDto } from './dto/res-brand-market-new-product.dto';
import { ResBrandTableProductDto } from './dto/res-brand-table-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  async createProduct(dto: ReqCreateProductDto, userId: string) {
    const { name, description, price, imageId } = dto;
    const product: Product = new Product();
    const brand: Brand = await Brand.findOne({ where: { userId } });
    product.brand = brand;
    product.un = product.generateUN();
    product.name = name;
    product.description = description;
    product.price = price;
    if (imageId) {
      const image: Image = await Image.findOne({
        where: { id: imageId },
      });
      product.image = image;
    }
    const result = await Product.save(product);
    return result;
  }

  async findProductByProductId(id: string) {
    const product: Product = await Product.findOne({
      where: { id },
    });
    return product;
  }

  async findProductsByUserId(userId: string) {
    console.log(`++++++ [products.service.ts] findProductsByUserId() ++++++`);
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] findProductsByUserId() brand:`,
      brand,
    );
    const products: Product[] = await Product.find({
      where: { brandId: brand.id },
    });
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] findProductsByUserId() products:`,
      products,
    );
    return products;
  }

  async loadBrandTableProducts(userId: string) {
    console.log(`++++++ [products.service.ts] loadBrandTableProducts() ++++++`);
    const products: Product[] = await this.findProductsByUserId(userId);
    const result: ResBrandTableProductDto[] = [];
    for (const p of products) {
      const totalNumberOfMarkets = await Lineup.count({
        where: { productId: p.id },
      });
      console.log(
        `❯❯❯❯❯❯ [products.service.ts] loadBrandTableProducts() totalNumberOfMarkets:`,
        totalNumberOfMarkets,
      );
      const totalNumberOfSales = await Order.count({
        where: { productId: p.id },
      });
      const lastLineup = await Lineup.find({
        where: { productId: p.id },
        order: { id: 'DESC' },
      });
      console.log(
        `❯❯❯❯❯❯ [products.service.ts] loadBrandTableProducts() lastLineup:`,
        lastLineup,
      );
      const lastMarket =
        lastLineup.length > 0
          ? await Market.findOne({
              where: { id: lastLineup[0].marketId },
            })
          : null;
      const openDateTimeOfLastMarket = lastMarket
        ? lastMarket.openDateTime
        : null;
      openDateTimeOfLastMarket;
      result.push({
        product: {
          id: p.id,
          un: p.un,
          name: p.name,
          price: p.price,
        },
        totalNumberOfMarkets,
        totalNumberOfSales,
        openDateTimeOfLastMarket,
      });
    }
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] loadBrandTableProducts() result:`,
      result,
    );

    const tempCount = await Lineup.count({ where: { productId: '1' } });
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] loadBrandTableProducts() tempCount:`,
      tempCount,
    );
    return result;
  }
  async loadMarketNewProducts(userId: string) {
    console.log(`++++++ [products.service.ts] loadMarketNewProducts() ++++++`);
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const products: Product[] = await Product.find({
      where: { brandId: brand.id },
    });
    const result: ResBrandMarketNewProductDto[] = [];
    for (const p of products) {
      result.push({
        product: {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
        },
      });
    }
    return result;
  }

  async loadMarketNewLineupsProducts(marketNewLineup: any) {
    console.log(
      `++++++ [products.service.ts] loadMarketNewLineupProducts() ++++++`,
    );
    const result = [];
    for (const key of Object.keys(marketNewLineup)) {
      const product: Product = await Product.findOne({
        // where: { id: marketNewLineup[key] },
        where: { id: key },
      });
      console.log(
        `❯❯❯❯❯❯ [products.service.ts] loadMarketNewLineupProducts() key:`,
        key,
      );
      result.push({
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] loadMarketNewLineupProducts() result:`,
      result,
    );
    return result;
  }

  async loadTicketNewOrdersProducts(ticketNewOrders: any) {
    console.log(
      `++++++ [products.service.ts] loadTicketNewOrdersProducts() ++++++`,
    );
    const result = [];
    for (const key of Object.keys(ticketNewOrders)) {
      const product: Product = await Product.findOne({
        where: { id: key },
      });
      console.log(
        `❯❯❯❯❯❯ [products.service.ts] loadTicketNewOrdersProducts() key:`,
        key,
      );
      result.push({
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }
    console.log(
      `❯❯❯❯❯❯ [products.service.ts] loadTicketNewOrdersProducts() result:`,
      result,
    );
    return result;
  }

  async loadCustomerBrandDetailProducts(brandId: string): Promise<Product[]> {
    const products = await Product.find({
      where: { brandId },
    });
    return products;
  }

  async loadCustomerTicketDetailProducts(ticketId: string): Promise<Product[]> {
    const orders: Order[] = await Order.find({
      where: { ticketId },
    });
    const result: Product[] = orders.map((order) => order.product);
    return result;
  }

  async loadBrandTicketDetailProducts(ticketId: string): Promise<Product[]> {
    const orders: Order[] = await Order.find({
      where: { ticketId },
    });
    const result: Product[] = orders.map((order) => order.product);
    return result;
  }

  async findProducts() {
    const products: Product[] = await Product.find();
    return products;
  }

  async loadCustomerProducts() {
    const result = await this.findProducts();
    return result;
  }

  async findProductsBySearchStr(searchStr: string): Promise<Product[]> {
    const result: Product[] = await Product.find({
      where: [
        { name: Like(`%${searchStr}%`) },
        { description: Like(`%${searchStr}%`) },
      ],
    });
    return result;
  }
}
