import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Campsite } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import * as xml2js from 'xml2js';
import { CampsiteList } from './go-camping.interface';

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

      console.log(header);
      console.log(totalCount);
      console.log(body);

      const data = items.map((item) => ({
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

        // name: item.trgnm,
        // address: item.adres,
        // facilities: item.facltcltynm,
        // phone: item.telno,
      }));

      try {
        await this.prisma.campsite.createMany({
          data,
          skipDuplicates: true,
        });
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
    name?: string,
    city?: string,
    state?: string,
    amenities?: string[],
  ) {
    const filter: any = {
      AND: [],
    };
    if (name) {
      filter.AND.push({ name: { contains: name } });
    }

    if (city) {
      filter.AND.push({ city: { contains: city } });
    }

    if (state) {
      filter.AND.push({ state: { contains: state } });
    }

    if (amenities && amenities.length > 0) {
      filter.AND.push({ Amenities: { some: { name: { in: amenities } } } });
    }

    const campsites = await this.prisma.campsite.findMany({
      where: filter,
      include: {
        amenities: true,
      },
    });

    return campsites;
  }

  create(data) {
    return this.prisma.campsite.createMany({ data });
  }
}
