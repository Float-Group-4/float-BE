import { Test, TestingModule } from '@nestjs/testing';
import { AllocationService } from './allocation.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AllocationService', () => {
  let service: AllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllocationService, PrismaService],
    }).compile();

    service = module.get<AllocationService>(AllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
