import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffTypesController } from './time-off-types.controller';
import { TimeOffTypesService } from './time-off-types.service';

describe('TimeOffTypesController', () => {
  let controller: TimeOffTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffTypesController],
      providers: [TimeOffTypesService],
    }).compile();

    controller = module.get<TimeOffTypesController>(TimeOffTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
