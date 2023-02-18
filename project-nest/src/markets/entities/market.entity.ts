import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Target } from 'src/targets/entities/target.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

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

  @Column()
  imageId: string;

  @Column()
  deliveryFee: number;
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
}
