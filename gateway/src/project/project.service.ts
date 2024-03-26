import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Project')
export class ProjectService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_project' }, createProjectDto),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_projects');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_projects' }, {}),
    );
    await this.cacheService.set('find_all_projects', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_project_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_project_by_id' }, id),
    );
    await this.cacheService.set(`find_project_by_id_${id}`, data);
    return data;
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
