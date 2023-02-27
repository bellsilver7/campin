import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // .env 파일 로드
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public/');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    '.hbs',
    exphbs.engine({
      extname: '.hbs',
      layoutsDir: 'views/layouts',
      partialsDir: 'views/partials',
    }),
  );

  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
