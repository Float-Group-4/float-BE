import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffsService } from './time-offs.service';

describe('TimeOffsService', () => {
  let service: TimeOffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffsService],
    }).compile();

    service = module.get<TimeOffsService>(TimeOffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
