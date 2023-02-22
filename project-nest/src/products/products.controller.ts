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
import { ReqCreateProductDto } from './dto/req-create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createProduct(
    @Req() req,
    @Body() dto: ReqCreateProductDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [products.controller.ts] createProduct() ++++++`);
    const result = await this.productsService.createProduct(dto, req.user.id);
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] createProduct() result:`,
      result,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('detail/:id')
  async detailProduct(
    @Req() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.productsService.findProductByProductId(id);
    return result;
  }

  @Get('table-list')
  async loadTableProducts(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [products.controller.ts] loadTableProducts() ++++++`);
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadTableProducts() req.user:`,
      req.user,
    );
    const result = await this.productsService.loadBrandTableProducts(
      req.user.id,
    );
    return result;
  }
}
