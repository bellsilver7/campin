import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home() {
    return { brandName: 'campin' };
  }

  @Get('/campsites')
  @Render('campsites')
  campsites() {
    return { brandName: 'campin' };
  }

  @Get('/campsites/:id')
  @Render('campsite-detail')
  campsite() {
    return { brandName: 'campin' };
  }

  @Get('/reservation')
  @Render('reservation')
  reservation() {
    return { brandName: 'campin' };
  }
}
