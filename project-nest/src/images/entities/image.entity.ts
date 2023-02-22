import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column()
  url: string;

  @OneToMany(() => User, (user) => user.image)
  users: User[];
  @OneToMany(() => Product, (product) => product.image)
  products: Product[];
  @OneToMany(() => Market, (market) => market.image)
  markets: Market[];
}
