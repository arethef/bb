import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get('profile')
  async getBrandProfile(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log(`++++++ [brands.controller.ts] getBrandProfile() ++++++`);
    console.log(`❯❯❯❯❯❯ req.user:`, req.user);
    const brand: Brand = await this.brandsService.findBrandByUserId(
      req.user.id,
    );
    const user = brand.user.removePasswordAndRefreshTokenFromUser(brand.user);
    console.log(`❯❯❯❯❯❯ user:`, user);

    return {
      id: brand.id,
      userId: brand.userId,
      user,
      businessName: brand.businessName,
      brn: brand.brn,
      introduction: brand.introduction,
    };
  }
}
