import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Campsite } from './campsite.interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CampsitesService {
  constructor(private httpService: HttpService, private prisma: PrismaClient) {}

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
}
