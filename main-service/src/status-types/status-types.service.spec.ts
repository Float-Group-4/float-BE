import { Test, TestingModule } from '@nestjs/testing';
import { StatusTypesService } from './status-types.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('StatusTypesService', () => {
  let service: StatusTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusTypesService, PrismaService],
    }).compile();

    service = module.get<StatusTypesService>(StatusTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
