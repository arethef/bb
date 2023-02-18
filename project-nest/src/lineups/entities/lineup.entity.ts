import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('lineups')
export class Lineup extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((lineup: Lineup) => lineup.market)
  marketId: string;
  @ManyToOne(() => Market, { eager: true })
  @JoinColumn()
  market: Market;

  @Column({ nullable: false })
  @RelationId((lineup: Lineup) => lineup.product)
  productId: string;
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @Column()
  quantity: number;
}
