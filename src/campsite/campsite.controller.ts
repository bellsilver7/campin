import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.campsiteService.findAll();
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
