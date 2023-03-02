import { Body, Controller, Get, Query, Render } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CampsiteSearchRequest } from './campsite.interface';

@Controller('campsites')
export class CampsitesController {
  constructor(private readonly campsiteService: CampsitesService) {}

  @Get()
  search(
    @Body() request: CampsiteSearchRequest & { page: number; pageSize: number },
  ) {
    return this.campsiteService.search(request);
  }

  @Get('/go')
  basedList() {
    return this.campsiteService.getCampsitesFromApi();
  }
}
