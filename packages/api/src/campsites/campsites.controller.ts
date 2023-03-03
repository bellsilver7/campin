import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { Prisma } from '@prisma/client';

@Controller('campsites')
export class CampsitesController {
  constructor(private readonly campsiteService: CampsitesService) {}

  @Get('/go')
  basedList() {
    return this.campsiteService.getCampsitesFromApi();
  }

  @Get()
  index(
    @Body('skip') skip: number,
    @Body('take') take: number,
    @Body('cursor') cursor: Prisma.CampsiteWhereUniqueInput,
    @Body('where') where: Prisma.CampsiteWhereInput,
    @Body('orderBy') orderBy: Prisma.CampsiteOrderByWithRelationInput,
  ) {
    return this.campsiteService.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.campsiteService.find({ id });
  }

  @Post()
  create(@Body() data: Prisma.CampsiteCreateInput) {
    return this.campsiteService.create(data);
  }

  @Patch('/:id')
  update(@Body() data: Prisma.CampsiteUpdateInput, @Param('id') id: string) {
    return this.campsiteService.update({ data, where: { id } });
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.campsiteService.remove({ id });
  }
}
