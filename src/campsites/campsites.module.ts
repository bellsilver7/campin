import { Module } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { HttpModule } from '@nestjs/axios';
import { CampsitesScheduler } from './campsites.scheduler';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CampsitesService, CampsitesScheduler],
})
export class CampsitesModule {}
