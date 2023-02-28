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
import { Product } from './entities/product.entity';
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

  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list-market-new-products')
  async loadMarketNewProducts(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(
      `++++++ [products.controller.ts] loadMarketNewProducts() ++++++`,
    );
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadMarketNewProducts() req.user:`,
      req.user,
    );
    const result = await this.productsService.loadMarketNewProducts(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('list-market-new-lineups')
  async loadMarketNewLineups(
    @Req() req,
    @Body() marketNewLineup,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [products.controller.ts] loadMarketNewLineup() ++++++`);
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadMarketNewLineup() req.user:`,
      req.user,
    );
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadMarketNewLineup() marketNewLineup:`,
      marketNewLineup,
    );
    const result = await this.productsService.loadMarketNewLineupsProducts(
      marketNewLineup,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('list-ticket-new-orders')
  async loadTicketNewOrders(
    @Req() req,
    @Body() ticketNewOrders,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [products.controller.ts] loadTicketNewOrders() ++++++`);
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadTicketNewOrders() req.user:`,
      req.user,
    );
    console.log(
      `❯❯❯❯❯❯ [products.controller.ts] loadTicketNewOrders() ticketNewOrders:`,
      ticketNewOrders,
    );
    const result = await this.productsService.loadTicketNewOrdersProducts(
      ticketNewOrders,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-brand-detail-list/:brandId')
  async loadCustomerBrandDetailProducts(
    @Req() req,
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Product[]> {
    const result = await this.productsService.loadCustomerBrandDetailProducts(
      brandId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-ticket-detail-list/:ticketId')
  async loadCustomerTicketDetailproducts(
    @Req() req,
    @Param('ticketId') ticketId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Product[]> {
    const result = await this.productsService.loadCustomerTicketDetailProducts(
      ticketId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('brand-ticket-detail-list/:ticketId')
  async loadBrandTicketDetailproducts(
    @Req() req,
    @Param('ticketId') ticketId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Product[]> {
    const result = await this.productsService.loadBrandTicketDetailProducts(
      ticketId,
    );
    return result;
  }
}
