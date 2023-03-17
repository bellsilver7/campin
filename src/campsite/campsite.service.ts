import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampsiteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCampsiteDto: Prisma.CampsiteCreateInput) {
    return this.prismaService.campsite.create({ data: createCampsiteDto });
  }

  findAll() {
    return this.prismaService.campsite.findMany();
  }

  filters(where: Prisma.CampsiteWhereInput) {
    return this.prismaService.campsite.findMany({ where });
  }

  findOne(id: string) {
    return this.prismaService.campsite.findUnique({ where: { id } });
  }

  update(id: string, updateCampsiteDto: Prisma.CampsiteUpdateInput) {
    return this.prismaService.campsite.update({
      data: updateCampsiteDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.campsite.delete({ where: { id } });
  }

  async getContentIdToMap() {
    const campsites = await this.prismaService.campsite.findMany({
      select: { id: true, contentId: true },
    });

    return campsites.reduce((map, campsite) => {
      map[campsite.contentId] = { id: campsite.id };
      return map;
    }, {});
  }
}
