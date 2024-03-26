import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

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
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createTeamMemberDto: CreateTeamMemberDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_team_member' },
        createTeamMemberDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_team_members');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_team_members' }, {}),
    );
    await this.cacheService.set('find_all_team_members', data);
    return data;
  }

  async findAllWithFilters(teamId: string, filter: TeamMemberFilter) {
    const cachedData = await this.cacheService.get(
      `find_team_members_by_team_id_and_filter_${teamId}_${JSON.stringify(filter)}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_team_members_by_team_id_and_filter' },
        { teamId, filter },
      ),
    );
    await this.cacheService.set(
      `find_team_members_by_team_id_and_filter_${teamId}_${JSON.stringify(filter)}`,
      data,
    );
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(
      `find_team_member_by_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_team_member_by_id' }, id),
    );
    await this.cacheService.set(`find_team_member_by_id_${id}`, data);
    return data;
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
