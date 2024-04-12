import { Test, TestingModule } from '@nestjs/testing';
import { StatusTypesController } from './status-types.controller';
import { StatusTypesService } from './status-types.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('StatusTypesController', () => {
  let controller: StatusTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusTypesController],
      providers: [StatusTypesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<StatusTypesController>(StatusTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
