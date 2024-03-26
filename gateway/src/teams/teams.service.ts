import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTeamDto, initTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  create(createTeamDto: CreateTeamDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_team' }, createTeamDto),
    );
  }

  async initTeam(createTeamDto: initTeamDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'init_team' }, { createTeamDto }),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_teams');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_teams' }, {}),
    );
    await this.cacheService.set('find_all_teams', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_team_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_team_by_id' }, id),
    );
    await this.cacheService.set(`find_team_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_team' },
        { id, updateTeamDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_team' }, { id }),
    );
  }
}
