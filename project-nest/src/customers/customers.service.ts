import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/images/entities/image.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqUpdateCustomerDto } from './dto/req-update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findCustomerByUserUsername(userUsername: string): Promise<Customer> {
    const user: User = await User.findOne({
      where: { username: userUsername },
    });
    const customer: Customer = await Customer.findOne({
      where: { userId: user.id },
    });
    return customer;
  }

  async findCustomerByUserId(userId: string): Promise<Customer> {
    const customer: Customer = await Customer.findOne({
      where: { userId },
    });
    return customer;
  }

  async updateCustomer(
    userId: string,
    dto: ReqUpdateCustomerDto,
  ): Promise<Customer> {
    const customer: Customer = await Customer.findOne({
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
    if (user.place) {
      const originalPlace: Place = await Place.findOne({
        where: { id: user.place.id },
      });
      if (
        originalPlace &&
        (originalPlace.zipcode !== dto.user.place.zipcode ||
          originalPlace.basic !== dto.user.place.basic ||
          originalPlace.detail !== dto.user.place.detail)
      ) {
        const place: Place = new Place();
        place.zipcode = dto.user.place.zipcode;
        place.basic = dto.user.place.basic;
        place.detail = dto.user.place.detail;
        await Place.save(place);
        user.place = place;
      }
    } else {
      if (dto.user.place) {
        const place: Place = new Place();
        place.zipcode = dto.user.place.zipcode;
        place.basic = dto.user.place.basic;
        place.detail = dto.user.place.detail;
        await Place.save(place);
        user.place = place;
      }
    }
    customer.nickname = dto.nickname;
    await User.save(user);
    const result: Customer = await Customer.save(customer);
    return result;
  }
}
