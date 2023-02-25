import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('bb')
    .setDescription('The bb api description')
    .setVersion('0.0.1')
    .addTag('bb')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // localhost:port/api

  await app.listen(process.env.PORT);
  // await app.listen(3000);
}
bootstrap();
