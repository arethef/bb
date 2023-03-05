import { Brand } from 'src/brands/entities/brand.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import { Target } from 'src/targets/entities/target.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('bookmarks')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((bookmark: Bookmark) => bookmark.customer)
  customerId: string;
  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @Column({ nullable: true })
  @RelationId((bookmark: Bookmark) => bookmark.brand)
  brandId: string;
  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn()
  brand: Brand;

  @Column({ nullable: true })
  @RelationId((bookmark: Bookmark) => bookmark.product)
  productId: string;
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @Column({ nullable: true })
  @RelationId((bookmark: Bookmark) => bookmark.market)
  marketId: string;
  @ManyToOne(() => Market, { eager: true })
  @JoinColumn()
  market: Market;

  // @Column({ nullable: false })
  // @RelationId((bookmark: Bookmark) => bookmark.target)
  // targetId: string;
  // @ManyToOne(() => Target, { eager: true })
  // @JoinColumn()
  // target: Target;
}
