import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern({ cmd: 'create_project' })
  create(createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'find_all_projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern({ cmd: 'find_projects_by_team_id' })
  findAllByTeamId(teamId: string) {
    return this.projectService.findAllByTeamId(teamId);
  }

  @MessagePattern({ cmd: 'find_project_by_id' })
  findOne(id: string) {
    return this.projectService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_project' })
  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @MessagePattern({ cmd: 'remove_project' })
  remove(id: string) {
    return this.projectService.remove(id);
  }
}
