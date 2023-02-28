import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
import { Customer } from 'src/customers/entities/customer.entity';
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

  async loadCustomerAllCardsBrandsAsc(): Promise<Brand[]> {
    const brands: Brand[] = await Brand.find({
      order: { businessName: 'ASC' },
    });
    return brands;
  }

  async findBrandById(id: string): Promise<Brand> {
    const brand: Brand = await Brand.findOne({
      where: { id },
    });
    return brand;
  }
}
