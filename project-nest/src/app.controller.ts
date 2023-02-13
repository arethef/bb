import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public-auth.decorator';
import { Brand } from './brands/entities/brand.entity';
import { Customer } from './customers/entities/customer.entity';
import { ReqSignupUserDto } from './users/dto/req-signup-user.dto';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() dto: ReqSignupUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.usersService.createUser(dto);
    res.status(201);
  }
}
