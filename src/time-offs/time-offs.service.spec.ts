import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffsService } from './time-offs.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TimeOffsService', () => {
  let service: TimeOffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffsService, PrismaService],
    }).compile();

    service = module.get<TimeOffsService>(TimeOffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
