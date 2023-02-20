import { Body, Controller, Get } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { SearchQuery } from './campsite.interface';

@Controller('campsites')
export class CampsitesController {
  constructor(private readonly campsiteService: CampsitesService) {}

  @Get('/search')
  search(@Body() body: SearchQuery) {
    const { name, city, state, amenities } = body;
    return this.campsiteService.search(name, city, state, amenities);
  }
}
