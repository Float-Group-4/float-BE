import { MessagePattern } from '@nestjs/microservices';
import { CreateTeamDto, initTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';
import { Controller } from '@nestjs/common';
@Controller('team')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern({ cmd: 'create_team' })
  create(createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @MessagePattern({ cmd: 'init_team' })
  init(createTeamDto: initTeamDto) {
    const { user, name } = createTeamDto;
    return this.teamsService.initTeam(user, name);
  }

  @MessagePattern({ cmd: 'find_all_teams' })
  findAll() {
    return this.teamsService.findAll();
  }

  @MessagePattern({ cmd: 'find_team_by_id' })
  findOne(id: string) {
    return this.teamsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_team' })
  update({ id, updateTeamDto }: { id: string; updateTeamDto: UpdateTeamDto }) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @MessagePattern({ cmd: 'remove_team' })
  remove(id: string) {
    return this.teamsService.remove(id);
  }
}
