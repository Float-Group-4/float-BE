import { Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

type peopleFilter = {
  ids: string[];
  isExclude: boolean;
};

type tagsFilterTM = {
  ids: string[];
  isExclude: boolean;
};

type roleFilter = {
  ids: string[];
  isExclude: boolean;
};

type typeFilter = {
  ids: string[];
  isExclude: boolean;
};

type departmentFilter = {
  ids: string[];
  isExclude: boolean;
};

export type TeamMemberFilter = {
  people?: peopleFilter;
  tags?: tagsFilterTM;
  role?: roleFilter;
  type?: typeFilter;
  department?: departmentFilter;
};

@Injectable()
export class TeamMembersService {
  constructor(private prisma: PrismaService) {}
  async create(createTeamMemberDto: CreateTeamMemberDto) {
    if (createTeamMemberDto.email) {
      const existedMember = await this.prisma.teamMember.findFirst({
        where: { email: createTeamMemberDto.email },
      });
      if (existedMember) {
        throw new Error('Email already existed in this team');
      } else {
        const user = await this.prisma.user.findFirst({
          where: { email: createTeamMemberDto.email },
        });
        return await this.prisma.teamMember.create({
          data: {
            ...createTeamMemberDto,
            userId: user ? user.id : null,
          },
        });
      }
    }
    return await this.prisma.teamMember.create({
      data: {
        ...createTeamMemberDto,
      },
    });
  }

  findAll() {
    return this.prisma.teamMember.findMany();
  }

  findAllByTeamId(teamId: string) {
    return this.prisma.teamMember.findMany({
      where: {
        teamId,
      },
    });
  }

  findAllWithFilters(teamId: string, filter: TeamMemberFilter) {
    const whereClause: Prisma.TeamMemberWhereInput = {
      teamId,
    };
    if (filter.people && filter.people.ids.length > 0) {
      whereClause.id = {
        [filter.people.isExclude ? 'notIn' : 'in']: filter.people.ids,
      };
    }

    if (filter.tags && filter.tags.ids.length > 0) {
      whereClause.TeamMemberTags = {
        some: {
          tagId: {
            [filter.tags.isExclude ? 'notIn' : 'in']: filter.tags.ids,
          },
        },
      };
    }

    if (filter.role && filter.role.ids.length > 0) {
      whereClause.roleId = {
        [filter.role.isExclude ? 'notIn' : 'in']: filter.role.ids,
      };
    }

    if (filter.type && filter.type.ids.length > 0) {
      whereClause.type = {
        [filter.type.isExclude ? 'notIn' : 'in']: filter.type.ids,
      };
    }

    if (filter.department && filter.department.ids.length > 0) {
      whereClause.departmentId = {
        [filter.department.isExclude ? 'notIn' : 'in']: filter.department.ids,
      };
    }

    return this.prisma.teamMember.findMany({
      where: whereClause,
    });
  }

  findOne(id: string) {
    return this.prisma.teamMember.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    if (updateTeamMemberDto.email) {
      const existedMember = await this.prisma.teamMember.findFirst({
        where: { email: updateTeamMemberDto.email },
      });
      if (existedMember && existedMember.id !== id) {
        throw new Error('Email already existed in this team');
      } else {
        const user = await this.prisma.user.findFirst({
          where: { email: updateTeamMemberDto.email },
        });

        return await this.prisma.teamMember.update({
          where: {
            id,
          },
          data: {
            ...updateTeamMemberDto,
            userId: user ? user.id : null,
          },
        });
      }
    }
  }

  remove(id: string) {
    return this.prisma.teamMember.delete({
      where: {
        id,
      },
    });
  }
}
