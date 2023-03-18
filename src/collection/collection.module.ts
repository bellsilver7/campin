import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { GocampingApiModule } from 'src/gocamping-api/gocamping-api.module';
import { CampsiteModule } from 'src/campsite/campsite.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), CampsiteModule, GocampingApiModule],
  providers: [CollectionService],
})
export class CollectionModule {}
