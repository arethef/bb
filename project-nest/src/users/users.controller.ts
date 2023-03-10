import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { ReqCheckEmailUserDto } from './dto/req-check-email-user.dto';
import { ReqCheckUsernameUserDto } from './dto/req-check-username-user.dto';
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
    console.log(`++++++ [users.controller.ts] checkUserEmailExists() ++++++`);
    const { email } = dto;
    const isUserEmailExists = await this.usersService.checkUserEmailExists(
      email,
    );
    console.log(`❯❯❯❯❯❯ isUserEmailExists:`, isUserEmailExists);

    return isUserEmailExists;
  }

  @Public()
  @Post('username-check')
  async checkUserUsernameExists(
    @Body() dto: ReqCheckUsernameUserDto,
  ): Promise<boolean> {
    console.log(
      `++++++ [users.controller.ts] checkUserUsernameExists() ++++++`,
    );
    const { username } = dto;
    const isUserUsernameExists =
      await this.usersService.checkUserUsernameExists(username);
    console.log(`❯❯❯❯❯❯ isUserUsernameExists:`, isUserUsernameExists);

    return isUserUsernameExists;
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('test')
  async testGetUserByUserId(@Req() req) {
    console.log(`++++++ [users.controller.ts] testGetUserByUserId() ++++++`);
    console.log(
      `❯❯❯❯❯❯ [users.controller.ts] testGetUserByUserId() req.user.id:`,
      req.user.id,
    );
    const result = await this.usersService.testGetUserByUserId(req.user.id);
    return result;
  }
}
