import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
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
