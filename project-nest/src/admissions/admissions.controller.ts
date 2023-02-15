import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdmissionsService } from './admissions.service';
import { ReqSendEmailDto } from './dto/req-send-email.dto';
import { ReqVerifyEmailDto } from './dto/req-verify-email.dto';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post('email-send')
  async sendEmail(
    @Body() dto: ReqSendEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(`[admissions.controller.ts] sendEmail()`);
    console.log(`❯❯❯❯❯❯ dto:`, dto);

    await this.admissionsService.sendUserJoinEmail(dto);
    res.status(201);
  }
  @Post('email-verify')
  async verifyEmail(
    @Query() dto: ReqVerifyEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.admissionsService.verifyEmail(dto);
    res.status(201);
  }
}
