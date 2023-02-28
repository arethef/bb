import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './entities/bookmark.entity';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('product/:productId')
  async insertBookmarkProduct(
    @Req() req,
    @Param('productId') productId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark> {
    const result = await this.bookmarksService.insertBookmarkProduct(
      req.user.id,
      productId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('market/:marketId')
  async insertBookmarkMarket(
    @Req() req,
    @Param('marketId') marketId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark> {
    const result = await this.bookmarksService.insertBookmarkMarket(
      req.user.id,
      marketId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('brand/:brandId')
  async insertBookmarkBrand(
    @Req() req,
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark> {
    const result = await this.bookmarksService.insertBookmarkBrand(
      req.user.id,
      brandId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  async loadCurrentBookmarks(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark[]> {
    const result = await this.bookmarksService.findBookmarksByUserId(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list-product')
  async loadCurrentBookmarksProduct(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark[]> {
    const result = await this.bookmarksService.loadCurrentBookmarksProduct(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list-market')
  async loadCurrentBookmarksMarket(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark[]> {
    const result = await this.bookmarksService.loadCurrentBookmarksMarket(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list-brand')
  async loadCurrentBookmarksBrand(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Bookmark[]> {
    const result = await this.bookmarksService.loadCurrentBookmarksBrand(
      req.user.id,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('product/:productId')
  async deleteBookmarkProduct(
    @Req() req,
    @Param('productId') productId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.bookmarksService.deleteBookmarkProduct(
      req.user.id,
      productId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('market/:marketId')
  async deleteBookmarkMarket(
    @Req() req,
    @Param('marketId') marketId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.bookmarksService.deleteBookmarkMarket(
      req.user.id,
      marketId,
    );
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('brand/:brandId')
  async deleteBookmarkBrand(
    @Req() req,
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.bookmarksService.deleteBookmarkBrand(
      req.user.id,
      brandId,
    );
    return result;
  }
}
