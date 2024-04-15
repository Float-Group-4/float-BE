import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from 'src/mail/mail.service';
import { TeamsService } from 'src/teams/teams.service';

type PeopleFilter = {
  ids: string[];
  isExclude: boolean;
};

type TagsFilterTM = {
  ids: string[];
  isExclude: boolean;
};

type RoleFilter = {
  ids: string[];
  isExclude: boolean;
};

type TypeFilter = {
  ids: string[];
  isExclude: boolean;
};

type DepartmentFilter = {
  ids: string[];
  isExclude: boolean;
};

export type TeamMemberFilter = {
  people?: PeopleFilter;
  tags?: TagsFilterTM;
  role?: RoleFilter;
  type?: TypeFilter;
  department?: DepartmentFilter;
};

@Injectable()
@ApiTags('Team Members')
export class TeamMembersService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    private readonly mailerService: MailerService,
    private readonly teamService: TeamsService,
  ) {}

  async create(createTeamMemberDto: CreateTeamMemberDto) {
    try {
      const result = await firstValueFrom(
        this.mainServiceClient.send(
          { cmd: 'create_team_member' },
          createTeamMemberDto,
        ),
      );
      this.sendWelcomeEmailToMember(createTeamMemberDto);
      return result;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw new Error('Failed to create team member');
    }
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_team_members' }, {}),
    );
  }

  findAllWithFilters(teamId: string, filter: TeamMemberFilter) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_team_members_by_team_id_and_filter' },
        { teamId, filter },
      ),
    );
  }

  findAllByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_team_members_by_team_id' },
        teamId,
      ),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_team_member_by_id' }, id),
    );
  }

  async update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    try {
      const result = await firstValueFrom(
        this.mainServiceClient.send(
          { cmd: 'update_team_member' },
          { id, updateTeamMemberDto },
        ),
      );
      this.sendWelcomeEmailToMember(updateTeamMemberDto);
      return result;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw new Error('Failed to update team member');
    }
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_team_member' }, id),
    );
  }

  private async sendWelcomeEmailToMember(
    memberDto: CreateTeamMemberDto | UpdateTeamMemberDto,
  ) {
    if (memberDto.email && memberDto.access) {
      const team = await this.teamService.findOne(memberDto.teamId);
      

      await this.mailerService.sendWelcomeEmail({
        toEmail: memberDto.email,
        sender: '"Float Notifications" <float.group4@gmail.com>',
        subject: 'Welcome to the Team!',
        recipientName: memberDto.name,
        inviterName: 'Someone',
        teamName: team.name,
        url: 'https://pro-ma.vercel.app/sign-in',
      });
    }
  }
}
