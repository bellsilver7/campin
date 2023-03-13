import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  @Post()
  create(@Body() data: Prisma.CampsiteCreateInput) {
    return this.campsiteService.create(data);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('cursor') cursor: Prisma.CampsiteWhereUniqueInput,
    @Query('where') where: Prisma.CampsiteWhereInput,
    @Query('orderBy') orderBy: Prisma.CampsiteOrderByWithRelationInput,
  ) {
    return this.campsiteService.findAll({ skip, take, cursor, where, orderBy });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.campsiteService.find({ id });
  }

  @Patch('/:id')
  update(@Body() data: Prisma.CampsiteUpdateInput, @Param('id') id: string) {
    return this.campsiteService.update(data, { id });
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.campsiteService.remove({ id });
  }
}
