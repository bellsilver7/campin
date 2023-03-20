import { Injectable, Logger } from '@nestjs/common';
import { Campsite, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampsiteService {
  private readonly logger = new Logger(CampsiteService.name);

  constructor(private readonly prismaService: PrismaService) {}

  create(createCampsiteDto: Prisma.CampsiteCreateInput) {
    return this.prismaService.campsite.create({ data: createCampsiteDto });
  }

  findAll() {
    return this.prismaService.campsite.findMany();
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

  search(
    keyword: string,
    city: string,
    page: number,
    pageSize: number,
  ): Promise<Campsite[]> {
    const where: Prisma.CampsiteWhereInput = {};
    const skip = ((page || 1) - 1) * pageSize;
    const take = pageSize;

    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { city: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = city;
    }

    return this.prismaService.campsite.findMany({ skip, take, where });
  }

  async createMany(createData: Prisma.CampsiteCreateManyInput[]) {
    if (createData.length > 0) {
      try {
        const chunk = (arr: any[], size: number) =>
          Array.from(
            { length: Math.ceil(arr.length / size) },
            (_: any, i: number) => arr.slice(i * size, i * size + size),
          );

        const chunked = chunk(createData, 100);
        for (const data of chunked) {
          const result = await this.prismaService.campsite.createMany({ data });
          this.logger.debug(`campsite createMany result = ${result.count}`);
        }
      } catch (error) {
        this.logger.error(`campsite createMany error = ${error}`);
      }
    }
  }

  async getContentIdToMap(): Promise<{
    [contentId: string]: Prisma.CampsiteSelect;
  }> {
    const campsites = await this.prismaService.campsite.findMany({
      select: { id: true, contentId: true },
    });

    return campsites.reduce((map, campsite) => {
      map[campsite.contentId] = { id: campsite.id };
      return map;
    }, {});
  }
}
