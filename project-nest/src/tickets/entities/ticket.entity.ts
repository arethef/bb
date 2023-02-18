import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

@Entity('tickets')
export class Ticket extends Base {
  @Column()
  un: string;

  @Column({ nullable: false })
  @RelationId((ticket: Ticket) => ticket.customer)
  customerId: string;
  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @Column({ nullable: false })
  @RelationId((ticket: Ticket) => ticket.brand)
  brandId: string;
  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn()
  brand: Brand;

  @Column({ nullable: false })
  @RelationId((ticket: Ticket) => ticket.market)
  marketId: string;
  @ManyToOne(() => Market, { eager: true })
  @JoinColumn()
  market: Market;

  @Column()
  totalQuantity: number;
  @Column()
  totalPrice: number;
  @Column()
  deliveryFreeApply: boolean;
  @Column()
  deliveryAddress: string;
  @Column()
  deliveryStatus: string;

  @OneToMany(() => Order, (order) => order.ticket)
  orders: Order[];
}
