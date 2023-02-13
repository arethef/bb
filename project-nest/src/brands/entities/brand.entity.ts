import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
