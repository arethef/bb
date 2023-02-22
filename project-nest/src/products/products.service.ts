import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Image } from 'src/images/entities/image.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ReqCreateProductDto } from './dto/req-create-product.dto';
import { ResBrandTableProductDto } from './dto/res-brand-table-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor() {}

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

    return result;
  }
}
