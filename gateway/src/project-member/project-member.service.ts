import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Project Member')
export class ProjectMemberService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
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

  getMembersByProjectId(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_members_by_project_id' }, id),
    );
  }

  async getAllMembers() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'get_all_members' }, {}),
    );
  }
}
