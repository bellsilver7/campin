import { Module } from '@nestjs/common';
import { GocampingApiService } from './gocamping-api.service';
import { ConfigModule } from '@nestjs/config';
import { CampsiteModule } from 'src/campsite/campsite.module';

@Module({
  imports: [ConfigModule, CampsiteModule],
  providers: [GocampingApiService],
  exports: [GocampingApiService],
})
export class GocampingApiModule {}
