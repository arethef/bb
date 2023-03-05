import { Address } from 'src/addresses/entities/address.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('places')
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  zipcode: string;
  @Column()
  basic: string;
  @Column()
  detail: string;

  @OneToMany(() => User, (user) => user.place)
  users: User[];
  @OneToMany(() => Address, (address) => address.place)
  addresses: Address[];
  // @OneToMany(() => Ticket, (ticket) => ticket.place)
  // tickets: Ticket[];
}
