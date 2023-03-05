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
import { ReqCreateMarketDto } from './dto/req-create-market.dto';
import { ResBrandProductDetailMarketDto } from './dto/res-brand-product-detail-table.dto';
import { ResBrandTableMarketDto } from './dto/res-brand-table-market.dto';
import { ResCustomerCardMarketDto } from './dto/res-customer-card-market.dto';
import { Market } from './entities/market.entity';
import { MarketsService } from './markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('new')
  async createMarket(
    @Req() req,
    @Body() dto: ReqCreateMarketDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [markets.controller.ts] createMarket() ++++++`);
    console.log(`❯❯❯❯❯❯ [markets.controller.ts] createMarket() dto:`, dto);
    const result = await this.marketsService.createMarket(req.user.id, dto);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('detail/:id')
  async detailMarket(
    @Req() req,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [markets.controller.ts] detailMarket() ++++++`);
    const result = await this.marketsService.findMarketByMarketId(id);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('brand-market-list')
  async loadBrandAllTableMarkets(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResBrandTableMarketDto[]> {
    const result = await this.marketsService.loadBrandAllTableMarkets(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('brand-product-detail-market-list/:productId')
  async loadBrandProductDetailMarkets(
    @Req() req,
    @Param('productId') productId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResBrandProductDetailMarketDto[]> {
    const result = await this.marketsService.loadBrandProductDetailMarkets(
      productId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-market-list-latest')
  async loadCustomerAllCardsMarketsLatest(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResCustomerCardMarketDto[]> {
    const result =
      await this.marketsService.loadCustomerAllCardsMarketsLatest();
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('customer-brand-detail-list/:brandId')
  async loadCustomerBrandDetailMarkets(
    @Req() req,
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Market[]> {
    const result = await this.marketsService.loadCustomerBrandDetailMarkets(
      brandId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:searchStr')
  async loadSearchMarketsResult(
    @Req() req,
    @Param('searchStr') searchStr: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Market[]> {
    const result = await this.marketsService.findMarketsBySearchStr(searchStr);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list/customer-product/:productId')
  async loadCustomerProductDetailMarkets(
    @Req() req,
    @Param('productId') productId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Market[]> {
    const result = await this.marketsService.loadCustomerProductDetailMarkets(
      productId,
    );
    return result;
  }
}
