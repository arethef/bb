import * as uuid from 'uuid';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    console.log(`❯❯❯❯❯❯ isUserEmailExists:`, isUserEmailExists);
    if (isUserEmailExists) {
      throw new UnprocessableEntityException(
        '[users.service.ts] createUser() 이미 가입된 이메일이다.',
      );
    }
    const isUserUsernameExists = await this.checkUserUsernameExists(
      dto.user.username,
    );
    console.log(`❯❯❯❯❯❯ isUserUsernameExists:`, isUserUsernameExists);
    if (isUserUsernameExists) {
      throw new UnprocessableEntityException(
        '[users.service.ts] createUser() 이미 등록된 username이다.',
      );
    }
    // const signupVerifyToken = uuid.v4();
    const user: User = new User();
    user.email = dto.user.email;
    user.password = dto.user.password;
    user.username = dto.user.username;
    const role: Role = await Role.findOne({
      where: { position: dto.role.position },
    });
    user.role = role;
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
        const userSaveResult = await qr.manager.save(user);
        console.log(`❯❯❯❯❯❯ userSaveResult:`, userSaveResult);
        const brandSaveResult = await qr.manager.save(brand);
        console.log(`❯❯❯❯❯❯ brandSaveResult:`, brandSaveResult);
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
  async checkUserEmailExists(email: string): Promise<boolean> {
    console.log(`++++++ [users.service.ts] checkUserEmailExists()) ++++++`);
    console.log(`❯❯❯❯❯❯ email:`, email);

    const user: User = await User.findOne({
      where: { email },
    });
    console.log(`❯❯❯❯❯❯ user:`, user);
    return user !== null;
  }
  private async checkUserUsernameExists(username: string): Promise<boolean> {
    console.log(`++++++ [users.service.ts] checkUserUsernameExists() ++++++`);
    console.log(`❯❯❯❯❯❯ username:`, username);
    const user: User = await User.findOne({
      where: { username },
    });
    console.log(`❯❯❯❯❯❯ user:`, user);
    return user !== null;
  }

  async findUserByUserUsername(username: string): Promise<User> {
    const user: User = await User.findOne({
      where: { username },
    });
    return user;
  }

  async findUserByUserId(id: string): Promise<User> {
    const user: User = await User.findOne({
      where: { id },
    });
    return user;
  }

  async findUserByIdAndRefreshToken(id: string, refreshToken: string) {
    console.log(
      `++++++ [users.service.ts] findUserByIdAndRefreshToken() ++++++`,
    );
    const user: User = await User.findOne({
      where: { id },
    });
    console.log(
      `❯❯❯❯❯❯ refreshToken:`,
      refreshToken,
      ', user.refreshToken:',
      user.refreshToken,
    );
    const isRefreshTokenMatch = await user.compareRefreshToken(refreshToken);
    if (isRefreshTokenMatch) {
      return user;
    } else {
      throw new HttpException(
        '[users.service.ts] findUserByIdAndRefreshToken() 리프레시 토큰 다르다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findUserByUserEmail(email: string): Promise<User> {
    const user: User = await User.findOne({
      where: { email },
    });
    return user;
  }

  async saveRefreshTokenWithUserId(id: string, refreshToken: string) {
    console.log(
      `++++++ [users.service.ts] saveRefreshTokenWithUserId() ++++++`,
    );
    console.log(`❯❯❯❯❯❯ id:`, id, `, refreshToken:`, refreshToken);
    const user: User = await User.findOne({ where: { id } });
    await user.encryptRefreshToken(refreshToken);
    await User.save(user);
  }
  // async findBrandOrCustomerByUserId(id: string): Promise<Brand | Customer> {
  //   const brand: Brand = await Brand.findOne({
  //     where: { userId: id },
  //   });
  //   const customer: Customer = await Customer.findOne({
  //     where: { userId: id },
  //   });

  //   if (brand) {
  //     return brand;
  //   } else {
  //     return customer;
  //   }
  // }
}
