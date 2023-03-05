import { Address } from 'src/addresses/entities/address.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import {
  generateTicketDayNumber,
  generateYYYYMMDD,
  getKST,
} from 'src/common/un';
import { Customer } from 'src/customers/entities/customer.entity';
import { Market } from 'src/markets/entities/market.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Place } from 'src/places/entities/place.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

const dayCount = generateTicketDayNumber();
let lastTicketDate = getKST();

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
  // @Column({ nullable: false })
  // @RelationId((ticket: Ticket) => ticket.place)
  // placeId: string;
  // @ManyToOne(() => Place, { eager: true })
  // @JoinColumn()
  // place: Place;
  // @Column({ nullable: true })
  // @RelationId((ticket: Ticket) => ticket.address)
  // addressId: string;
  // @ManyToOne(() => Address, { eager: true })
  // @JoinColumn()
  // address: Address;
  @Column({ default: '1' })
  deliveryStatus: string; // 1:진행중 2:완료 3:취소(?)

  @OneToMany(() => Order, (order) => order.ticket)
  orders: Order[];

  @BeforeInsert()
  increaseDayCount() {
    lastTicketDate = getKST();
  }

  generateUN() {
    return `${generateYYYYMMDD()}15${Date.now()}${dayCount.next().value}`;
  }
}
