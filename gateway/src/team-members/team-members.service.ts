import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

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
  ) {}

  create(createTeamMemberDto: CreateTeamMemberDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_team_member' },
        createTeamMemberDto,
      ),
    );
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

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_team_member_by_id' }, id),
    );
  }

  update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_team_member' },
        { id, updateTeamMemberDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_team_member' }, id),
    );
  }
}
