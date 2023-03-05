import {
  Body,
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
import { ReqCreateLinkDto } from './dto/req-create-link.dto';
import { ReqDeleteLinkDto } from './dto/req-delete-link.dto';
import { Link } from './entities/link.entity';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list/:brandId')
  async loadLinks(
    @Req() req,
    @Param('brandId') brandId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Link[]> {
    const result = await this.linksService.findLinksByBrandId(brandId);
    return result;
  }

  /// insert 만ㄷㄹ기 reqcreatelinkdto[] 이렇게
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async insertLinks(
    @Req() req,
    @Body() dtos: ReqCreateLinkDto[],
    @Res({ passthrough: true }) res: Response,
  ): Promise<Link[]> {
    const result = await this.linksService.insertLinks(req.user.id, dtos);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('delete')
  async deleteLinks(
    @Req() req,
    @Body() dtos: ReqDeleteLinkDto[],
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [links.controller.ts] deleteLinks() ++++++`);
    console.log(`❯❯❯❯❯❯ [links.controller.ts] deleteLinks() dtos:`, dtos);
    const result = await this.linksService.deleteLinks(dtos);
    return result;
  }
}
