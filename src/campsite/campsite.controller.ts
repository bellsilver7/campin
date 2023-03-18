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
  filtered(
    @Query()
    filterCampsiteDto: {
      skip?: string;
      take?: string;
      cursor?: Prisma.CampsiteWhereUniqueInput;
      where?: Prisma.CampsiteWhereInput;
      orderBy?: Prisma.CampsiteOrderByWithRelationInput;
    },
  ) {
    const { skip, take, cursor, where, orderBy } = filterCampsiteDto;
    return this.campsiteService.filteredAll({
      skip: parseInt(skip),
      take: parseInt(take),
      cursor,
      where,
      orderBy,
    });
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
