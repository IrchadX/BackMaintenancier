import { Test, TestingModule } from '@nestjs/testing';
import { AidantService } from './aidant.service';

describe('AidantService', () => {
  let service: AidantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AidantService],
    }).compile();

    service = module.get<AidantService>(AidantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
