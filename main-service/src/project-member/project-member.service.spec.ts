import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberService } from './project-member.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ProjectService', () => {
  let service: ProjectMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMemberService, PrismaService],
    }).compile();

    service = module.get<ProjectMemberService>(ProjectMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
