import { Test, TestingModule } from '@nestjs/testing';
import { AidantController } from './aidant.controller';
import { AidantService } from './aidant.service';

describe('AidantController', () => {
  let controller: AidantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AidantController],
      providers: [AidantService],
    }).compile();

    controller = module.get<AidantController>(AidantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
