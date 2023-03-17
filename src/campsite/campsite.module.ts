import { Module } from '@nestjs/common';
import { CampsiteService } from './campsite.service';
import { CampsiteController } from './campsite.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CampsiteController],
  providers: [CampsiteService],
})
export class CampsiteModule {}
