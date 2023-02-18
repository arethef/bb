import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('targets')
export class Target extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: true })
  @RelationId((target: Target) => target.brand)
  brandId: string;
  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn()
  brand: Brand;

  @Column({ nullable: true })
  @RelationId((target: Target) => target.product)
  productId: string;
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @Column({ nullable: true })
  @RelationId((target: Target) => target.market)
  marketId: string;
  @ManyToOne(() => Market, { eager: true })
  @JoinColumn()
  market: Market;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.target)
  bookmarks: Bookmark[];
}
