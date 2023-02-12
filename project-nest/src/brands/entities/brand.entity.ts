import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

const saltRounds = 10;

@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @VersionColumn({ default: 1 })
  version: number;

  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  @Exclude()
  password: string;
  @Column({ unique: true })
  nickname: string;
  @Column()
  businessName: string;
  @Column()
  brn: string; // business registration number

  @Column({ default: '1' })
  imageId: string;

  @Column({ select: false, nullable: true })
  @Exclude()
  signupVerifyToken: string;
  @Column({ select: false, nullable: true })
  @Exclude()
  refreshToken?: string;

  @BeforeInsert()
  async encryptPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    } catch (e) {
      throw new InternalServerErrorException(
        '브랜드 비밀번호 암호화 문제 생겼다.',
        e,
      );
    }
  }

  /**
   * 입력으로 들어온 플레인비밀번호를 암호화하고
   * db에 저장된 암호화된 비밀번호와 일치하는지 확인
   * @param plainPassword 입력으로 들어온 비밀번호
   * @returns 비밀번호 일치 여부, 일치:true 불일치:false
   */
  async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }

  /**
   * 객체의 리프레시 토큰을 암호화하여 저장
   */
  async encryptRefreshToken(refreshToken: string): Promise<void> {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(refreshToken, salt);
      this.refreshToken = hash;
    } catch (e) {
      throw new InternalServerErrorException(
        '브랜드 리프레시 토큰 암호화 문제 생겼다.',
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
    return await bcrypt.compare(plainRefreshToken, this.refreshToken);
  }
}
