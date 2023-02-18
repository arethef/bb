import { Link } from 'src/links/entities/link.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import { Target } from 'src/targets/entities/target.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
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

@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((brand: Brand) => brand.user)
  userId: string;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column()
  businessName: string;
  @Column()
  brn: string; // business registration number
  @Column({ nullable: true, type: 'text' })
  introduction: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
  @OneToMany(() => Market, (market) => market.brand)
  markets: Market[];
  @OneToMany(() => Ticket, (ticket) => ticket.brand)
  tickets: Ticket[];
  @OneToMany(() => Target, (target) => target.brand)
  targets: Target[];
  @OneToMany(() => Link, (link) => link.brand)
  links: Link[];
}
