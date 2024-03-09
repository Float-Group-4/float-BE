import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffsController } from './time-offs.controller';
import { TimeOffsService } from './time-offs.service';

describe('TimeOffsController', () => {
  let controller: TimeOffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffsController],
      providers: [TimeOffsService],
    }).compile();

    controller = module.get<TimeOffsController>(TimeOffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
