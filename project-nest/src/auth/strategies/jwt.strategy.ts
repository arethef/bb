import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    console.log(`++++++ [jwt.strategy.ts] constructor() ++++++`);

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          // console.log(
          //   `❯❯❯❯❯❯ [jwt.strategy.ts] constructor() request:`,
          //   request,
          // );

          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_ACCESS_TOKEN'),
    });
  }

  /**
   * strategy에서 validate() 함수의 반환값이 controller의 req로 간다
   * @param payload payload
   * @returns user entity에서 비밀번호와 리프레시토큰을 제외한 부분
   */
  async validate(payload: any) {
    console.log(`++++++ [jwt.strategy.ts] validate() ++++++`);
    console.log(`❯❯❯❯❯❯ [jwt.strategy.ts] validate() payload:`, payload);
    const user: User = await this.usersService.findUserByUserId(payload.id);
    console.log(`❯❯❯❯❯❯ [jwt.strategy.ts] validate() user:`, user);
    const { password, refreshToken, ...result } = user;
    return result;
  }
}
