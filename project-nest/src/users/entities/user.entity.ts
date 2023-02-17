import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Brand } from 'src/brands/entities/brand.entity';
import { Base } from 'src/common/base/base.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Place } from 'src/places/entities/place.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

const saltRounds = 10;

@Entity('users')
export class User extends Base {
  @Column({ unique: true })
  email: string;
  // @Column({ select: false })
  @Exclude()
  @Column()
  password: string;
  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  @RelationId((user: User) => user.role)
  roleId: string; // 1:'brand' | 2:'customer' : 입장, 역할(?)
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  @Column({ nullable: true })
  imageId: string;

  @Column({ nullable: true })
  @RelationId((user: User) => user.place)
  placeId: string;
  @ManyToOne(() => Place, { eager: true })
  @JoinColumn()
  place: Place;

  // @Exclude()
  // @Column({ select: false, nullable: true })
  // signupVerifyToken: string;
  // @Column({ select: false, nullable: true })
  @Exclude() // refresh token과 같은 민감 데이터 응답에서 제외시키기
  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => Brand, (brand) => brand.user)
  brands: Brand[];
  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @BeforeInsert()
  async encryptPassword(): Promise<void> {
    console.log(`++++++ [user.entity.ts] encryptPassword() ++++++`);

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    } catch (e) {
      console.log(`e:`, e);
      throw new InternalServerErrorException('비밀번호 암호화 문제 생겼다.', e);
    }
  }

  /**
   * 입력으로 들어온 플레인비밀번호를 암호화하고
   * db에 저장된 암호화된 비밀번호와 일치하는지 확인
   * @param plainPassword 입력으로 들어온 비밀번호
   * @returns 비밀번호 일치 여부, 일치:true 불일치:false
   */
  async comparePassword(plainPassword: string): Promise<boolean> {
    console.log(`++++++ [user.entity.ts] comparePassword() ++++++`);
    console.log(
      `❯❯❯❯❯❯ plainPassword`,
      plainPassword,
      `, this.password:`,
      this.password,
    );
    return await bcrypt.compare(plainPassword, this.password);
  }

  /**
   * 객체의 리프레시 토큰을 암호화하여 저장
   */
  async encryptRefreshToken(refreshToken: string): Promise<void> {
    console.log(`++++++ [user.entity.ts] encryptRefreshToken() ++++++`);
    console.log(`refershToken:`, refreshToken);

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(refreshToken, salt);
      this.refreshToken = hash;
    } catch (e) {
      throw new InternalServerErrorException(
        '리프레시 토큰 암호화 문제 생겼다.',
        e,
      );
    }
  }

  /**
   * 입력으로 들어온 플레인리프레시토큰을 암호화하고
   * db에 저장된 암호화된 리프레시토큰과 일치하는지 확인
   * @param plainRefreshToken 입력으로 들어온 refresh token
   * @returns refresh token 일치 여부, 일치:true 불일치:false
   */
  async compareRefreshToken(plainRefreshToken: string): Promise<boolean> {
    console.log(`++++++ [user.entity.ts] compareRefreshToken() ++++++`);
    console.log(`plainRefreshToken`, plainRefreshToken);
    return await bcrypt.compare(plainRefreshToken, this.refreshToken);
  }
}
