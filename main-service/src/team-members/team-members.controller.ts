import { MessagePattern } from '@nestjs/microservices';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { GetTeamMembersDto } from './dto/get-team-members-dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMembersService } from './team-members.service';
import { Controller } from '@nestjs/common';

@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @MessagePattern({ cmd: 'create_team_member' })
  create(createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMembersService.create(createTeamMemberDto);
  }

  @MessagePattern({ cmd: 'find_all_team_members' })
  findAll() {
    return this.teamMembersService.findAll();
  }

  @MessagePattern({ cmd: 'find_team_member_by_id' })
  findOne(id: string) {
    return this.teamMembersService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_team_members_by_team_id_and_filter' })
  findAllFiltered(Body: GetTeamMembersDto) {
    const { teamId, filter } = Body;
    console.log('teamId', teamId);
    console.log('filter', filter.people.ids);
    return this.teamMembersService.findAllWithFilters(teamId, filter);
  }

  @MessagePattern({ cmd: 'update_team_member' })
  update(id: string, updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.teamMembersService.update(id, updateTeamMemberDto);
  }

  @MessagePattern({ cmd: 'remove_team_member' })
  remove(id: string) {
    return this.teamMembersService.remove(id);
  }
}
