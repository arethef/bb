import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  async findBrandByUserUsername(userUsername: string): Promise<Brand> {
    const user: User = await User.findOne({
      where: { username: userUsername },
    });
    const brand: Brand = await Brand.findOne({
      where: { userId: user.id },
    });
    return brand;
  }

  async findBrandByUserId(userId: string): Promise<Brand> {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    return brand;
  }
}
