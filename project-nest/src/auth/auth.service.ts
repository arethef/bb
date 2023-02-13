import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BrandsService } from 'src/brands/brands.service';
import { CustomersService } from 'src/customers/customers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly brandsService: BrandsService,
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * username을 통해 사용자를 찾고 password가 맞는지 확인
   * @param username 입력 username
   * @param password 입력 password
   * @returns 해당 객체(Brand or Customer)의
   * password, signupVerifyToken, refreshToken 제외한 나머지 부분
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.usersService.findUserbyUsername(username);
    if (user && (await user.comparePassword(password))) {
      const { password, signupVerifyToken, refreshToken, ...result } = user;
      return result;
    } else {
      throw new NotFoundException(
        `[auth.service.ts] valudateUser()에서 사용자를 찾을 수 없다.`,
      );
    }
  }

  /**
   * access token 발급 받기
   * @param id 사용자 아이디
   * @returns 생성된 access token과 cookie 정보 반환
   */
  genCookieWithJwtAccessToken(id: string) {
    const payload = { id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      // expiresIn: `${this.configService.get('JWT_EXPIRATION_ACCESS_TOKEN')}s`,
      expiresIn: this.configService.get('JWT_EXPIRATION_ACCESS_TOKEN'),
    });

    return {
      accessToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_EXPIRATION_ACCESS_TOKEN')),
    };
  }
  /**
   * refresh token 발급 받기
   * @param id 사용자 아이디
   * @returns 생성된 refresh token과 cookie 정보 반환
   */
  genCookieWithJwtRefreshToken(id: string) {
    const payload = { id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRATION_REFRESH_TOKEN'),
    });

    return {
      refreshToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get(`JWT_EXPIRATION_REFRESH_TOKEN`)),
    };
  }

  genCookieForLogout() {
    console.log(`[auth.service.ts] getCookieForLogout()`);
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
