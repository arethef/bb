import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    console.log(`++++++ [local.strategy.ts] constructor() ++++++`);

    super({
      // usernameField: 'emailOrNickname',
    });
  }

  /**
   * 사용자가 존재하고 유효한지 확인
   * @param username 입력 username
   * @param password 입력 password
   * @returns Brand 또는 Customer entity에서
   * password, signupVerifyToken, refreshToken을 제외한 나머지 부분
   */
  async validate(username: string, password: string): Promise<any> {
    console.log(`++++++ [local.strategy.ts] validate() ++++++`);
    console.log(`❯❯❯❯❯❯ username:`, username, `, password:`, password);

    const result = await this.authService.validateUser(username, password);
    console.log(`❯❯❯❯❯❯ result:`, result);
    return result;
    // if (result) {
    //   return result;
    // } else {
    //   throw new UnauthorizedException(
    //     '[local.strategy.ts] validate()에서 authService를 이용한 사용자 인증 시 넘어온 결과가 없다.',
    //   );
    // }
  }
}
