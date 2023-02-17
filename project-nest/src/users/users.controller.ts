import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { ReqCheckEmailUserDto } from './dto/req-check-email-user.dto';
import { ReqSignupUserDto } from './dto/req-signup-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('email-check')
  async checkUserEmailExists(
    @Body() dto: ReqCheckEmailUserDto,
  ): Promise<boolean> {
    console.log(`++++++ [users.controller.ts] signup() ++++++`);
    const { email } = dto;
    const isUserEmailExists = await this.usersService.checkUserEmailExists(
      email,
    );
    console.log(`❯❯❯❯❯❯ isUserEmailExists:`, isUserEmailExists);

    return isUserEmailExists;
  }

  @Public()
  @Post('signup')
  async signup(
    @Body() dto: ReqSignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<object> {
    console.log(`++++++ [users.controller.ts] signup() ++++++`);
    console.log(`❯❯❯❯❯❯ dto:`, dto);
    const result = await this.usersService.createUser(dto);
    console.log(`result:`, result);
    res.status(201);
    return {
      result: 'success',
    };
  }
}
