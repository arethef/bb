import * as uuid from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Place } from 'src/places/entities/place.entity';
import { Role } from 'src/roles/entities/role.entity';
import { ReqSignupUserDto } from './dto/req-signup-user.dto';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async createUser(dto: ReqSignupUserDto): Promise<void> {
    console.log(`++++++ [users.service.ts] createUser() ++++++`);

    const isUserEmailExists = await this.checkUserEmailExists(dto.user.email);
    if (isUserEmailExists) {
      throw new UnprocessableEntityException(
        '[users.service.ts] createUser() 이미 가입된 이메일이다.',
      );
    }
    const isUserUsernameExists = await this.checkUserUsernameExists(
      dto.user.username,
    );
    if (isUserUsernameExists) {
      throw new UnprocessableEntityException(
        '[users.service.ts] createUser() 이미 등록된 username이다.',
      );
    }
    const user: User = new User();
    user.email = dto.user.email;
    user.password = dto.user.password;
    user.username = dto.user.username;
    const role: Role = await Role.findOne({
      where: { position: dto.role.position },
    });
    user.role = role;
    const signupVerifyToken = uuid.v4();
    user.signupVerifyToken = signupVerifyToken;
    // const userSaveResult = await User.save(user);
    // console.log(`❯❯❯❯❯❯ userSaveResult:`, userSaveResult);
    if (dto.role.position === 'brand') {
      const place: Place = new Place();
      place.zipcode = dto.place.zipcode;
      place.basic = dto.place.basic;
      place.detail = dto.place.detail;
      user.place = place;
      const brand: Brand = new Brand();
      brand.businessName = dto.brand.businessName;
      brand.brn = dto.brand.brn;
      brand.introduction = dto.brand.introduction;
      brand.user = user;
      const qr = this.dataSource.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();
      try {
        await qr.manager.save(user);
        await qr.manager.save(brand);
        await qr.commitTransaction();
      } catch (e) {
        await qr.rollbackTransaction();
      } finally {
        await qr.release();
      }
      // const brandSaveResult = await Brand.save(brand);
      // console.log(`❯❯❯❯❯❯ brandSaveResult:`, brandSaveResult);
    } else {
      const customer: Customer = new Customer();
      customer.nickname = dto.customer.nickname;
      customer.user = user;
      const qr = this.dataSource.createQueryRunner();
      await qr.connect();
      await qr.startTransaction();
      try {
        await qr.manager.save(user);
        await qr.manager.save(customer);
        await qr.commitTransaction();
      } catch (e) {
        await qr.rollbackTransaction();
      } finally {
        await qr.release();
      }
      // const customerSaveResult = await Customer.save(customer);
      // console.log(`❯❯❯❯❯❯ customerSaveResult:`, customerSaveResult);
    }
  }
  private async checkUserEmailExists(email: string): Promise<boolean> {
    const user: User = await User.findOne({
      where: { email },
    });
    return user !== (undefined || null);
  }
  private async checkUserUsernameExists(username: string): Promise<boolean> {
    const user: User = await User.findOne({
      where: { username },
    });
    return user !== (undefined || null);
  }

  async findUserbyUsername(username: string): Promise<User> {
    const user: User = await User.findOne({
      where: { username },
    });
    return user;
  }
}
