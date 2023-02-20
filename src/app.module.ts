import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampsitesModule } from './campsites/campsites.module';
import { CampsitesController } from './campsites/campsites.controller';

@Module({
  imports: [CampsitesModule],
  controllers: [AppController, CampsitesController],
  providers: [AppService],
})
export class AppModule {}
