import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ReqLoginUserDto } from 'src/users/dto/req-login-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() dto: ReqLoginUserDto,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [auth.controller.ts] login() ++++++`);
    // console.log(`❯❯❯❯❯❯ dto:`, dto);
    // console.log(`❯❯❯❯❯❯ req:`, req);

    // const { username } = dto.user;
    const username = req.user.username;
    const user = await this.usersService.findUserByUserUsername(username);
    const { accessToken, ...accessOption } =
      this.authService.genCookieWithJwtAccessToken(user.id);
    const { refreshToken, ...refreshOption } =
      this.authService.genCookieWithJwtRefreshToken(user.id);
    await this.usersService.saveRefreshTokenWithUserId(user.id, refreshToken);
    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return req.user;
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } =
      this.authService.genCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
    // console.log(`++++++ [auth.controller.ts] refresh() ++++++`);
    // console.log(`❯❯❯❯❯❯ user:`, user);
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('test-profile')
  getProfile(@Req() req) {
    // console.log(`++++++ [auth.controller.ts] getProfile() ++++++`);
    // console.log(`❯❯❯❯❯❯ req.cookies:`, req.cookies);

    return req.user;
  }
}
