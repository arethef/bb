import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import fileConfig from 'src/config/fileConfig';
import { ResSaveImageDto } from './dto/res-save-image.dto';
import { Image } from './entities/image.entity';
import { uploadFileURL } from './multer.option';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(fileConfig.KEY)
    private fileconfig: ConfigType<typeof fileConfig>,
  ) {}

  async uploadFileDiskDestination(
    file: Express.Multer.File,
  ): Promise<ResSaveImageDto> {
    const url = uploadFileURL(file, this.fileconfig.upload.url.image);
    const image: Image = new Image();
    image.url = url;
    const result = await Image.save(image);
    return {
      image: {
        id: result.id,
      },
    };
  }
}
