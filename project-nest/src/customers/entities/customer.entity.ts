import { Address } from 'src/addresses/entities/address.entity';
import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
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

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((customer: Customer) => customer.user)
  userId: string;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column()
  nickname: string;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];
  @OneToMany(() => Ticket, (ticket) => ticket.customer)
  tickets: Ticket[];
  @OneToMany(() => Bookmark, (bookmark) => bookmark.customer)
  bookmarks: Bookmark[];
}
