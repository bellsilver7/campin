import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClientModule } from './client.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ClientModule);

  app.useStaticAssets(join(__dirname, '../../../', 'public'));
  app.setBaseViewsDir(join(__dirname, '../../../', 'views'));
  app.setViewEngine('hbs');

  await app.listen(8080);
}
bootstrap();
