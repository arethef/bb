import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
}
