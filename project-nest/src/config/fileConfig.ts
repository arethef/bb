import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  upload: {
    url: {
      image: process.env.FILE_UPLOAD_URL_IMAGE,
    },
  },
}));
