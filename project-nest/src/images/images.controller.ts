import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { ResSaveImageDto } from './dto/res-save-image.dto';
import { ImagesService } from './images.service';
import { multerDiskDestinationOptions } from './multer.option';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Public()
  @Post('upload-disk-destination')
  @UseInterceptors(FileInterceptor('imageFile', multerDiskDestinationOptions))
  async uploadFileDiskDestination(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResSaveImageDto> {
    console.log(`++++++ [images.controller.ts] uploadFileDestination() ++++++`);
    const result = await this.imagesService.uploadFileDiskDestination(file);
    return result;
  }

  @Get(':url')
  async downloadImage(
    @Param('url') url: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.download(url);
  }
}
