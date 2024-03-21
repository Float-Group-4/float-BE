import { Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';

@Injectable()
export class ProjectMemberService {
  constructor(private prisma: PrismaService) {}

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

  getMembersByProjectId(id: string) {
    const member = this.prisma.project.findUnique({ where: { id } });
    return member;
  }

  getAllMembers() {
    return this.prisma.user.findMany();
  }
}
