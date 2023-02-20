import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Campsite } from './campsite.interface';
import { CampsitesService } from './campsites.service';

@Injectable()
export class CampsitesScheduler {
  constructor(private readonly campsitesService: CampsitesService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('Fetching campsites from API...');
    const campsites = await this.campsitesService.getCampsitesFromApi();
    console.log(`Fetched ${campsites.length} campsites from API.`);
  }
}
