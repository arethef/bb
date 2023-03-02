import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomersService } from './customers.service';
import { ReqUpdateCustomerDto } from './dto/req-update-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('profile')
  async getCustomerProfile(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [customers.controller.ts] getCustomerProfile() ++++++`);
    console.log(`❯❯❯❯❯❯ [customers.controller.ts] req.user:`, req.user);
    const customer: Customer = await this.customersService.findCustomerByUserId(
      req.user.id,
    );
    const user = customer.user.removePasswordAndRefreshTokenFromUser(
      customer.user,
    );
    console.log(`❯❯❯❯❯❯ [customers.controller.ts] user:`, user);
    return {
      id: customer.id,
      userId: customer.userId,
      user,
      nickname: customer.nickname,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async updateCustomer(
    @Req() req,
    @Body() dto: ReqUpdateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Customer> {
    const result = await this.customersService.updateCustomer(req.user.id, dto);
    return result;
  }
}
