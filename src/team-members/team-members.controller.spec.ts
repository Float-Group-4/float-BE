import { Test, TestingModule } from '@nestjs/testing';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('TeamMembersController', () => {
  let controller: TeamMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMembersController],
      providers: [TeamMembersService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<TeamMembersController>(TeamMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
