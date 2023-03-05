import { Customer } from 'src/customers/entities/customer.entity';
import { Place } from 'src/places/entities/place.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
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

@Entity('addresses')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((address: Address) => address.customer)
  customerId: string;
  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @Column({ nullable: false })
  @RelationId((address: Address) => address.place)
  placeId: string;
  @ManyToOne(() => Place, { eager: true })
  @JoinColumn()
  place: Place;

  @Column({ nullable: true })
  alias: string;

  // @OneToMany(() => Ticket, (ticket) => ticket.address)
  // tickets: Ticket[];
}
