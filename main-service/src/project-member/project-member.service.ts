import { Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Project Member')
export class ProjectMemberService {
  constructor(private readonly prisma: PrismaService) {}

  addMember(createProjectMemberDto: CreateProjectMemberDto) {
    return this.prisma.project.update({
      where: { id: createProjectMemberDto.projectId },
      data: {
        ProjectMember: {
          create: {
            teamMemberId: createProjectMemberDto.teamMemberId,
          },
        },
      },
    });
  }

  deleteMember(deleteProjectMemberDto: DeleteProjectMemberDto) {
    const { projectId, teamMemberId } = deleteProjectMemberDto;
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        ProjectMember: {
          delete: { id: teamMemberId },
        },
      },
    });
  }

  findProjectMembersByProjectId(projectId: string) {
    return this.prisma.projectMember.findMany({
      where: { projectId },
    });
  }

  getAllMembers() {
    return this.prisma.user.findMany();
  }
}
