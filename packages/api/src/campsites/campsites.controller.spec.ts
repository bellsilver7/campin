import { Test, TestingModule } from '@nestjs/testing';
import { CampsitesController } from './campsites.controller';

describe('CampsitesController', () => {
  let controller: CampsitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampsitesController],
    }).compile();

    controller = module.get<CampsitesController>(CampsitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
