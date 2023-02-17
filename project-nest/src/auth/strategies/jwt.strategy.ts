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
          console.log(
            `❯❯❯❯❯❯ [jwt.strategy.ts] constructor() request:`,
            request,
          );

          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_ACCESS_TOKEN'),
    });
  }

  async validate(payload: any) {
    console.log(`++++++ [jwt.strategy.ts] validate() ++++++`);
    console.log(`❯❯❯❯❯❯ [jwt.strategy.ts] validate() payload:`, payload);
    const user: User = await this.usersService.findUserByUserId(payload.id);
    const { password, refreshToken, ...result } = user;
    return result;
  }
}
