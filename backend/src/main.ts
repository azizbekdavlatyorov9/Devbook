import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  }); 

  app.use(cookieParser()); 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useStaticAssets('uploads/images', {
    prefix: '/uploads/',
  });
  // Old records use `/images/...`; retain this path during migration.
  app.useStaticAssets('uploads/images', {
    prefix: '/images/',
  });

  const config = new DocumentBuilder()
    .setTitle('DevBook API')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap();
