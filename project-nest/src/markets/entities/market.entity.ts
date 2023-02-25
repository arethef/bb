import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import {
  generateMarketDayNumber,
  generateYYYYMMDD,
  getKST,
} from 'src/common/un';
import { Image } from 'src/images/entities/image.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Target } from 'src/targets/entities/target.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

const dayCount = generateMarketDayNumber();
let lastMarketDate = getKST();

@Entity('markets')
export class Market extends Base {
  @Column()
  un: string;

  @Column({ nullable: false })
  @RelationId((market: Market) => market.brand)
  brandId: string;
  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn()
  brand: Brand;

  @Column()
  title: string;
  @Column()
  content: string;

  @Column({ nullable: true })
  @RelationId((market: Market) => market.image)
  imageId: string;
  @ManyToOne(() => Image, { eager: true })
  @JoinColumn()
  image: Image;

  @Column()
  deliveryFee: number; // 일반 배송비
  @Column()
  deliveryFeeAdded: number; // 도서산간지역 배송비
  @Column()
  deliveryFree: number;
  @Column()
  minimumQuantity: number;
  @Column()
  openDateTime: Date;
  @Column()
  closeDateTime: Date;

  @OneToMany(() => Lineup, (lineup) => lineup.market)
  lineups: Lineup[];
  @OneToMany(() => Ticket, (ticket) => ticket.market)
  tickets: Ticket[];
  @OneToMany(() => Target, (target) => target.market)
  targets: Target[];

  @BeforeInsert()
  increaseDayCount() {
    lastMarketDate = getKST();
  }

  generateUN() {
    return `${generateYYYYMMDD()}14${Date.now()}${dayCount.next().value}`;
  }
}
