import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('create_project')
  create(createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @MessagePattern('find_all_projects')
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern('find_project_by_id')
  findOne(id: string) {
    return this.projectService.findOne(id);
  }

  @MessagePattern('update_project')
  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @MessagePattern('remove_project')
  remove(id: string) {
    return this.projectService.remove(id);
  }
}
