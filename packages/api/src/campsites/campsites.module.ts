import { Module } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CampsitesScheduler } from './campsites.scheduler';
import { CampsitesController } from './campsites.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [CampsitesController],
  providers: [CampsitesService, CampsitesScheduler],
})
export class CampsitesModule {}
