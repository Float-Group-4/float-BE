import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTeamDto, initTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
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

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_teams' }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_team_by_id' }, id),
    );
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
