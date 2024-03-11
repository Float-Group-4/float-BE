import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffTypesController } from './time-off-types.controller';
import { TimeOffTypesService } from './time-off-types.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('TimeOffTypesController', () => {
  let controller: TimeOffTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffTypesController],
      providers: [TimeOffTypesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TimeOffTypesController>(TimeOffTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
