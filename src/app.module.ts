import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CampsiteModule } from './campsite/campsite.module';
import { CollectionModule } from './collection/collection.module';
import { GocampingApiModule } from './gocamping-api/gocamping-api.module';

@Module({
  imports: [PrismaModule, CampsiteModule, CollectionModule, GocampingApiModule],
})
export class AppModule {}
