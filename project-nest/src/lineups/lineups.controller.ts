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
import { ReqCreateLineupsDto } from './dto/req-create-lineups.dto';
import { LineupsService } from './lineups.service';

@Controller('lineups')
export class LineupsController {
  constructor(private readonly lineupsService: LineupsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createLineups(
    @Req() req,
    @Body() dto: ReqCreateLineupsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`++++++ [lineups.controller.ts] createLineups() ++++++`);
    console.log(`❯❯❯❯❯❯ [lineups.controller.ts] createLineups() dto:`, dto);
    const result = await this.lineupsService.createLineups(dto);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':marketId')
  async loadLineups(
    @Req() req,
    @Param('marketId') marketId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.lineupsService.findLineupsByMarketId(marketId);
    return result;
  }
}
