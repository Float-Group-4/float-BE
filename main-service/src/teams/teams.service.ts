import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  create(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        ...createTeamDto,
      },
    });
  }

  async initTeam(user: UserEntity, name: string) {
    // Create the team and its owner simultaneously
    const team = await this.prisma.team.create({
      data: {
        name: name,
        TeamMember: {
          create: {
            userId: user.id,
            name: user.name,
            type: 'Owner',
            hourlyRate: 1000,
            access: 'Admin',
            email: user.email,
          },
        },
      },
      // Include the created team members in the response
      include: {
        TeamMember: true,
      },
    });

    // Retrieve the ID of the team member who is the owner
    const ownerTeamMemberId = team.TeamMember[0].id;

    // Update the team to set the teamOwnerId
    return await this.prisma.team.update({
      where: { id: team.id },
      data: { teamOwnerId: ownerTeamMemberId },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  findOne(id: string) {
    return this.prisma.team.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        ...updateTeamDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.team.delete({
      where: {
        id,
      },
    });
  }

  getTeamByUser(user: string) {
    return this.prisma.team.findMany({
      where: {
        TeamMember: {
          some: {
            userId: user,
          },
        },
      },
    });
  }
}
