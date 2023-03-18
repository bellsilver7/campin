import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { CampsiteService } from 'src/campsite/campsite.service';
import { GocampingCampsite } from './gocamping-api.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class GocampingApiService {
  private readonly logger = new Logger(GocampingApiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly campsiteService: CampsiteService,
  ) {}

  async getData(): Promise<GocampingCampsite[]> {
    // GoCamping API를 호출하고 데이터를 JSON으로 변환하여 반환합니다.
    // TODO 전체 페이지 가져올 수 있도록 수정 필요
    const endpoint = this.configService.get<string>('GO_CAMPING_ENDPOINT');
    const serviceKey = this.configService.get<string>('GO_CAMPING_SERVICE_KEY');
    const apiUrl = `${endpoint}/basedList`;

    const pageNo = 1;
    const numOfRows = 1000;
    const MobileOS = 'ETC';
    const MobileApp = 'AppTest';
    const params = { serviceKey, pageNo, numOfRows, MobileOS, MobileApp };

    try {
      this.logger.debug(
        `fetch gocamping api = ${apiUrl} ${JSON.stringify(params)}`,
      );
      const response = await axios.get(apiUrl, { params });
      const xmlData = response.data;

      const parserOptions = { explicitArray: false, ignoreAttrs: true };
      const parser = new xml2js.Parser(parserOptions);
      const jsonData = await parser.parseStringPromise(xmlData);
      const { header, body } = jsonData.response;
      const items = body.items.item;
      this.logger.debug(`fetch gocamping items = ${items.length}`);

      return items;
    } catch (error) {
      this.logger.error(`gocamping getData = ${error}`);
      return [];
    }
  }

  async prepareCampsiteDataForDB(): Promise<{
    insertData: any;
    updateData: any;
  }> {
    const insertData = [];
    const updateData = [];

    const items = await this.getData();
    const campsiteMap = await this.campsiteService.getContentIdToMap();
    for (const item of items) {
      // 데이터 설정
      const data: Prisma.CampsiteCreateManyInput = {
        contentSource: 'gocamping',
        contentId: item.contentId,
        name: item.facltNm,
        intro: item.lineIntro,
        description: item.intro,
        city: item.doNm,
        state: item.sigunguNm,
        address: item.addr1,
        imageUrl: item.firstImageUrl,
        reservationUrl: item.resveUrl,
        phoneNumber: item.tel,
      };

      // 이미 존재하는 데이터인 경우 업데이트할 데이터 목록에 추가
      const existingData = campsiteMap[item.contentId];
      if (existingData) {
        updateData.push({ where: { id: existingData.id }, data });
      } else {
        // 새로운 데이터인 경우 등록할 데이터 목록에 추가
        data['contentId'] = item.contentId;
        insertData.push(data);
      }
    }

    this.logger.debug(
      `prepared gocamping insertData = ${insertData.length} / updateData = ${updateData.length}`,
    );
    return { insertData, updateData };
  }
}
