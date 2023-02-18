import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Target } from 'src/targets/entities/target.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

@Entity('products')
export class Product extends Base {
  @Column()
  un: string; // unique number: 년월일+codeId+해당날짜로만들어진객체번호순/?

  @Column({ nullable: false })
  @RelationId((product: Product) => product.brand)
  brandId: string;
  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn()
  brand: Brand;

  @Column()
  name: string;
  @Column()
  description: string;

  @Column({ nullable: true })
  imageId: string;

  @Column()
  price: number;

  @OneToMany(() => Lineup, (lineup) => lineup.product)
  lineups: Lineup[];
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
  @OneToMany(() => Target, (target) => target.product)
  targets: Target[];
}
