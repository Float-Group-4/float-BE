import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService, PrismaService],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
