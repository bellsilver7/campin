import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // .env 파일 로드

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
