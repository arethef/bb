import { Product } from 'src/products/entities/product.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((order: Order) => order.ticket)
  ticketId: string;
  @ManyToOne(() => Ticket, { eager: true })
  @JoinColumn()
  ticket: Ticket;

  @Column({ nullable: false })
  @RelationId((order: Order) => order.product)
  productId: string;
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;

  @Column()
  quantity: number;
}
