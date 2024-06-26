import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { MailerService } from 'src/mail/mail.service';

@Injectable()
@ApiTags('Project')
export class ProjectService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    private readonly mailerService: MailerService,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_project' }, createProjectDto),
    );
  }

  async findAll() {
    
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_projects' }, {}),
    );
  }

  async findAllByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_projects_by_team_id' }, teamId),
    );
  }

  async findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_project_by_id' }, id),
    );
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_project' },
        { id, updateProjectDto },
      ),
    );
  }

  async remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_project' }, id),
    );
  }
}
