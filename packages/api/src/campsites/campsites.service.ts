import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Campsite } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import * as xml2js from 'xml2js';
import { CampsiteSearchRequest } from './campsite.interface';

@Injectable()
export class CampsitesService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    // prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
    //   console.log('Query: ' + event.query);
    //   console.log('Duration: ' + event.duration + 'ms');
    // });
  }

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

      // console.log(header);
      // console.log(totalCount);
      // console.log(body);

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

          await this.prisma.campsite.update({
            data: item,
            where: {
              contentId: item.contentId,
            },
          });
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

  async search(
    request: CampsiteSearchRequest & { page: number; pageSize: number },
  ) {
    const filter: any = {
      AND: [],
    };

    if (request?.name) {
      filter.AND.push({ name: { contains: request.name } });
    }

    if (request?.city) {
      filter.AND.push({ city: request.city });
    }

    if (request?.state) {
      filter.AND.push({ state: request.state });
    }

    if (request?.amenities && request?.amenities.length > 0) {
      filter.AND.push({
        Amenities: { some: { name: { in: request.amenities } } },
      });
    }

    const page = request.page || 1;
    const pageSize = request.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const total = await this.prisma.campsite.count();
    const campsites = await this.prisma.campsite.findMany({
      where: filter,
      include: {
        amenities: true,
      },
      skip: skip,
      take: pageSize,
    });

    return {
      page,
      pageSize,
      total,
      campsites,
    };
  }

  create(data) {
    return this.prisma.campsite.createMany({ data });
  }
}
