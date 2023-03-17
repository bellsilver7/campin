import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CampsiteModule } from './campsite/campsite.module';

@Module({
  imports: [PrismaModule, CampsiteModule],
})
export class AppModule {}
