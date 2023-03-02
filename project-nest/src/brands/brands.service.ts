import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/bookmarks/entities/bookmark.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Image } from 'src/images/entities/image.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqUpdateBrandDto } from './dto/req-update-brand.dto';
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

  async updateBrand(userId: string, dto: ReqUpdateBrandDto): Promise<Brand> {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const user: User = await User.findOne({
      where: { id: userId },
    });
    user.email = dto.user.email;
    user.username = dto.user.username;
    if (dto.user.password !== '') {
      user.password = dto.user.password;
    }
    if (user.image.id !== dto.user.image.id) {
      const image: Image = await Image.findOne({
        where: { id: user.image.id },
      });
      user.image = image;
    }
    const originalPlace: Place = await Place.findOne({
      where: { id: user.place.id },
    });
    if (
      originalPlace.zipcode !== dto.user.place.zipcode ||
      originalPlace.basic !== dto.user.place.basic ||
      originalPlace.detail !== dto.user.place.detail
    ) {
      const place: Place = new Place();
      place.zipcode = dto.user.place.zipcode;
      place.basic = dto.user.place.basic;
      place.detail = dto.user.place.detail;
      await Place.save(place);
      user.place = place;
    }
    brand.introduction = dto.introduction;
    await User.save(user);
    const result: Brand = await Brand.save(brand);
    return result;
  }
}
