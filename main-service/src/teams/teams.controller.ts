import { MessagePattern } from '@nestjs/microservices';
import { CreateTeamDto, initTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern('create_team')
  create(createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @MessagePattern('init_team')
  init(createTeamDto: initTeamDto) {
    const { user, name } = createTeamDto;
    return this.teamsService.initTeam(user, name);
  }

  @MessagePattern('find_all_teams')
  findAll() {
    return this.teamsService.findAll();
  }

  @MessagePattern('find_team_by_id')
  findOne(id: string) {
    return this.teamsService.findOne(id);
  }

  @MessagePattern('update_team')
  update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @MessagePattern('remove_team')
  remove(id: string) {
    return this.teamsService.remove(id);
  }
}
