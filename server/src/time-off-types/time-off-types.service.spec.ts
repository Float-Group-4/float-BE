import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffTypesService } from './time-off-types.service';

describe('TimeOffTypesService', () => {
  let service: TimeOffTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffTypesService],
    }).compile();

    service = module.get<TimeOffTypesService>(TimeOffTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
