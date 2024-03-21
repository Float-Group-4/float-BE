import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffsController } from './time-offs.controller';
import { TimeOffsService } from './time-offs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('TimeOffsController', () => {
  let controller: TimeOffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffsController],
      providers: [TimeOffsService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TimeOffsController>(TimeOffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
