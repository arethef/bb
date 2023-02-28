import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import { Target } from 'src/targets/entities/target.entity';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarksService {
  async insertBookmarkProduct(
    userId: string,
    productId: string,
  ): Promise<Bookmark> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmark: Bookmark = new Bookmark();
    bookmark.customer = customer;
    const target: Target = new Target();
    target.product = await Product.findOne({
      where: { id: productId },
    });
    const targetResult = await Target.save(target);
    bookmark.target = targetResult;
    const result = await Bookmark.save(bookmark);
    return result;
  }
  async insertBookmarkMarket(
    userId: string,
    marketId: string,
  ): Promise<Bookmark> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmark: Bookmark = new Bookmark();
    bookmark.customer = customer;
    const target: Target = new Target();
    target.market = await Market.findOne({
      where: { id: marketId },
    });
    const targetResult = await Target.save(target);
    bookmark.target = targetResult;
    const result = await Bookmark.save(bookmark);
    return result;
  }
  async insertBookmarkBrand(
    userId: string,
    brandId: string,
  ): Promise<Bookmark> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmark: Bookmark = new Bookmark();
    bookmark.customer = customer;
    const target: Target = new Target();
    target.brand = await Brand.findOne({
      where: { id: brandId },
    });
    const targetResult = await Target.save(target);
    bookmark.target = targetResult;
    const result = await Bookmark.save(bookmark);
    return result;
  }

  async findBookmarksByUserId(userId: string): Promise<Bookmark[]> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const result = await Bookmark.find({
      where: { customerId: customer.id },
    });
    return result;
  }

  async loadCurrentBookmarksProduct(userId: string): Promise<Bookmark[]> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmarks: Bookmark[] = await Bookmark.find({
      where: { customerId: customer.id },
    });
    const result = bookmarks.filter(
      (bookmark) => bookmark.target.product !== null,
    );
    return result;
  }
  async loadCurrentBookmarksMarket(userId: string): Promise<Bookmark[]> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmarks: Bookmark[] = await Bookmark.find({
      where: { customerId: customer.id },
    });
    const result = bookmarks.filter(
      (bookmark) => bookmark.target.market !== null,
    );
    return result;
  }
  async loadCurrentBookmarksBrand(userId: string): Promise<Bookmark[]> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const bookmarks: Bookmark[] = await Bookmark.find({
      where: { customerId: customer.id },
    });
    const result = bookmarks.filter(
      (bookmark) => bookmark.target.brand !== null,
    );
    return result;
  }

  async deleteBookmarkProduct(userId: string, productId: string) {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const target: Target = await Target.findOne({
      where: { productId },
    });
    const bookmark = await Bookmark.findOne({
      where: { customerId: customer.id, targetId: target.id },
    });
    const result = await Bookmark.remove(bookmark);
    return result;
  }

  async deleteBookmarkMarket(userId: string, marketId: string) {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const target: Target = await Target.findOne({
      where: { marketId },
    });
    const bookmark = await Bookmark.findOne({
      where: { customerId: customer.id, targetId: target.id },
    });
    const result = await Bookmark.remove(bookmark);
    return result;
  }

  async deleteBookmarkBrand(userId: string, brandId: string) {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    const target: Target = await Target.findOne({
      where: { brandId },
    });
    const bookmark = await Bookmark.findOne({
      where: { customerId: customer.id, targetId: target.id },
    });
    const result = await Bookmark.remove(bookmark);
    return result;
  }
}
