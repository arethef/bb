import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import {
  generateProductDayNumber,
  generateYYYYMMDD,
  getKST,
} from 'src/common/un';
import { Image } from 'src/images/entities/image.entity';
import { Lineup } from 'src/lineups/entities/lineup.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Target } from 'src/targets/entities/target.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

// let dayCount = 0;
const dayCount = generateProductDayNumber();
let lastProductDate = getKST();

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
  @RelationId((product: Product) => product.image)
  imageId: string;
  @ManyToOne(() => Image, { eager: true })
  @JoinColumn()
  image: Image;

  @Column()
  price: number;

  @OneToMany(() => Lineup, (lineup) => lineup.product)
  lineups: Lineup[];
  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
  // @OneToMany(() => Target, (target) => target.product)
  // targets: Target[];
  @OneToMany(() => Bookmark, (bookmark) => bookmark.product)
  bookmarks: Bookmark[];

  @BeforeInsert()
  increaseDayCount() {
    console.log(`++++++ [product.entity.ts] increaseDayCount() ++++++`);
    console.log(`❯❯❯❯❯❯ dayCount:`, dayCount);

    // if (Math.abs(lastProductDate.getDate() - getKST().getDate()) >= 1) {
    //   dayCount = 0;
    // }
    // dayCount += 1;
    // console.log(`❯❯❯❯❯❯ dayCount:`, dayCount);
    lastProductDate = getKST();
  }

  generateUN() {
    return `${generateYYYYMMDD()}13${Date.now()}${dayCount.next().value}`;
  }
}
