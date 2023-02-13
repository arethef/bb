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
}
