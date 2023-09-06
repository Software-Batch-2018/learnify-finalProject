import { Test, TestingModule } from '@nestjs/testing';
import { QaserviceService } from './qaservice.service';

describe('QaserviceService', () => {
  let service: QaserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QaserviceService],
    }).compile();

    service = module.get<QaserviceService>(QaserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
