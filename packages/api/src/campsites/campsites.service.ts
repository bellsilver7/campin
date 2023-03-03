import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Campsite, Prisma } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import * as xml2js from 'xml2js';

@Injectable()
export class CampsitesService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async getCampsitesFromApi(): Promise<boolean> {
    function reachedLastPage(
      totalCount: number,
      pageNo: number,
      numOfRows: number,
    ): boolean {
      return totalCount - pageNo * numOfRows <= 0;
    }

    const params = {
      serviceKey: this.configService.get<string>('GO_CAMPING_SERVICE_KEY'),
      pageNo: 1,
      numOfRows: 1000,
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
    };
    const url =
      this.configService.get<string>('GO_CAMPING_ENDPOINT') + '/basedList';
    const parserOptions = { explicitArray: false, ignoreAttrs: true };
    const parser = new xml2js.Parser(parserOptions);

    let totalCount = params.numOfRows + 1;
    let numOfRows = params.numOfRows;
    let pageNo = params.pageNo;
    let count = 0;

    do {
      const response = await axios.get(url, { params });
      const xmlData = response.data;
      const jsonData = await parser.parseStringPromise(xmlData);
      const header = jsonData.response.header;
      const body = jsonData.response.body;
      const items = body.items.item;
      numOfRows = body.numOfRows;
      pageNo = body.pageNo;
      totalCount = body.totalCount;

      const data: Campsite[] = items.map((item) => {
        console.log(`예약: ${item.resveUrl}`);

        return {
          contentId: Number(item.contentId),
          name: item.facltNm,
          intro: item.lineIntro,
          description: item.intro,
          city: item.doNm,
          state: item.sigunguNm,
          address: item.addr1,
          // address2: item.addr2,
          // locationClass: item.lctCl,
          // mapX: item.mapX,
          // mapY: item.mapY,
          // homepage: item.homepage,
          imageUrl: item.firstImageUrl,
          reservationUrl: item.resveUrl,

          // name: item.trgnm,
          // address: item.adres,
          // facilities: item.facltcltynm,
          // phone: item.telno,
        };
      });

      try {
        // const result = await this.prisma.campsite.createMany({
        //   data,
        //   skipDuplicates: true,
        // });

        data.map(async (item) => {
          count++;
          console.log(count);

          await this.prisma.campsite.create({ data: item });

          // const result = await this.prisma.campsite.update({
          //   data: item,
          //   where: {
          //     contentId: item.contentId,
          //   },
          // });
        });

        // Logger.debug('result =', result);
      } catch (error) {
        console.log(error);
        throw new Error('고캠핑 데이터 연동 오류 발생!');
      }

      // 다음 페이지 설정
      params.pageNo++;
    } while (!reachedLastPage(totalCount, pageNo, numOfRows));

    return true;
  }

  find(where?: Prisma.CampsiteWhereUniqueInput): Promise<Campsite | null> {
    return this.prisma.campsite.findUnique({ where });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CampsiteWhereUniqueInput;
    where?: Prisma.CampsiteWhereInput;
    orderBy?: Prisma.CampsiteOrderByWithRelationInput;
  }): Promise<Campsite[]> {
    const { skip, take, cursor, where, orderBy } = params;
    console.log(params);

    return this.prisma.campsite.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.CampsiteCreateInput): Promise<Campsite> {
    return this.prisma.campsite.create({ data });
  }

  update(params: {
    data: Prisma.CampsiteUpdateInput;
    where: Prisma.CampsiteWhereUniqueInput;
  }): Promise<Campsite> {
    const { data, where } = params;
    return this.prisma.campsite.update({ data, where });
  }

  remove(where: Prisma.CampsiteWhereUniqueInput): Promise<Campsite> {
    return this.prisma.campsite.delete({ where });
  }
}
