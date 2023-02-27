import { Body, Controller, Get, Render } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { SearchQuery } from './campsite.interface';

@Controller('campsites')
export class CampsitesController {
  constructor(private readonly campsiteService: CampsitesService) {}

  @Get('/search')
  @Render('campsites')
  search(@Body() body: SearchQuery) {
    const { name, city, state, amenities } = body;
    return this.campsiteService.search(name, city, state, amenities);
  }

  @Get('/go')
  basedList() {
    return this.campsiteService.getCampsitesFromApi();
  }
}
