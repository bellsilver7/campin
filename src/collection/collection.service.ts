import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CampsiteService } from 'src/campsite/campsite.service';
import { GocampingApiService } from 'src/gocamping-api/gocamping-api.service';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    private readonly campsiteSerivce: CampsiteService,
    private readonly gocampingApiService: GocampingApiService,
  ) {}

  @Cron('0 0 6 * * *')
  async gocamping() {
    try {
      this.logger.debug('gocamping cron start');
      const { insertData, updateData } =
        await this.gocampingApiService.prepareCampsiteDataForDB();

      // 새로운 데이터 등록
      if (insertData.length > 0) {
        this.logger.debug(`gocamping insertData start`);
        await this.campsiteSerivce.createMany(insertData);
        this.logger.debug(`gocamping insertData finish`);
      }

      // 이미 존재하는 데이터 업데이트
      if (updateData.length > 0) {
        this.logger.debug(`gocamping updateData start`);
        updateData.map(
          async ({ where, data }) =>
            await this.campsiteSerivce.update(where.id, data),
        );
        this.logger.debug(`gocamping updateData finish`);
      }

      this.logger.debug('gocamping cron finish');
    } catch (error) {
      this.logger.error(`collect gocamping = {error}`);
    }
  }
}
