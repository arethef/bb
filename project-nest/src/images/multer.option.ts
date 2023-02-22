import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const uploadFileURL = (file: Express.Multer.File, url: string): string =>
  `${url}/${file.filename}`;

export const multerDiskDestinationOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식이다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = './static/uploads/images';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename(request, file, callback) {
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200,
    fieldSize: 1024 * 1024,
    fields: 2,
    filesize: 16777216,
    files: 10,
  },
};
