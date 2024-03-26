import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Project Members')
export class ProjectMemberService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  addMember(createProjectMemberDto: CreateProjectMemberDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'add_member' },
        createProjectMemberDto,
      ),
    );
  }

  deleteMember(deleteProjectMemberDto: DeleteProjectMemberDto) {
    const { projectId, teamMemberId } = deleteProjectMemberDto;
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'delete_member' },
        { projectId, teamMemberId },
      ),
    );
  }

  async getMembersByProjectId(id: string) {
    const cachedData = await this.cacheService.get(
      `get_members_by_project_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_members_by_project_id' }, id),
    );
    await this.cacheService.set(`get_members_by_project_id_${id}`, data);
    return data;
  }

  async getAllMembers() {
    const cachedData = await this.cacheService.get('get_all_members');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_all_members' }, {}),
    );
    await this.cacheService.set('get_all_members', data);
    return data;
  }
}
