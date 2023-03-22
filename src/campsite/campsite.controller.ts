import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CampsiteService } from './campsite.service';
import { Prisma } from '@prisma/client';

@Controller('campsite')
export class CampsiteController {
  constructor(private readonly campsiteService: CampsiteService) {}

  @Post()
  create(@Body() createCampsiteDto: Prisma.CampsiteCreateInput) {
    return this.campsiteService.create(createCampsiteDto);
  }

  @Get()
  search(
    @Query('keyword') keyword?: string,
    @Query('city') city?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const parsedPage = page ? parseInt(page) : 0;
    const parsedPageSize = pageSize ? parseInt(pageSize) : 12;

    return this.campsiteService.search(
      keyword,
      city,
      parsedPage,
      parsedPageSize,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campsiteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampsiteDto: Prisma.CampsiteUpdateInput,
  ) {
    return this.campsiteService.update(id, updateCampsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campsiteService.remove(id);
  }
}
