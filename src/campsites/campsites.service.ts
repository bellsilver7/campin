import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Campsite } from './campsite.interface';

@Injectable()
export class CampsitesService {
  constructor(private httpService: HttpService) {}

  async getCampsitesFromApi(): Promise<Campsite[]> {
    const response = await this.httpService
      .get('http://api.data.go.kr/openapi/campgrounds-free-std', {
        params: {
          ServiceKey: process.env.OPEN_API_KEY,
          pageNo: 1,
          numOfRows: 10,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          _type: 'json',
        },
      })
      .toPromise();

    const items = response.data.response.body.items.item;
    const campsites = items.map((item) => ({
      name: item.trgnm,
      address: item.adres,
      facilities: item.facltcltynm,
      phone: item.telno,
    }));

    return campsites;
  }
}
