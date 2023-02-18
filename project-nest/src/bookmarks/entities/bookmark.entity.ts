import { Customer } from 'src/customers/entities/customer.entity';
import { Target } from 'src/targets/entities/target.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('bookmarks')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: false })
  @RelationId((bookmark: Bookmark) => bookmark.customer)
  customerId: string;
  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @Column({ nullable: false })
  @RelationId((bookmark: Bookmark) => bookmark.target)
  targetId: string;
  @ManyToOne(() => Target, { eager: true })
  @JoinColumn()
  target: Target;
}
