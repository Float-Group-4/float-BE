import { MessagePattern } from '@nestjs/microservices';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ProjectMemberService } from './project-member.service';
import { Controller } from '@nestjs/common';
@Controller('project-member')
export class ProjectMemberController {
  constructor(private readonly projectService: ProjectMemberService) {}
  //  Add member to project
  @MessagePattern({ cmd: 'add_member' })
  addMember(createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectService.addMember(createProjectMemberDto);
  }

  //   Delete member from project
  @MessagePattern({ cmd: 'delete_member' })
  deleteMember(deleteProjectMemberDto: DeleteProjectMemberDto) {
    return this.projectService.deleteMember(deleteProjectMemberDto);
  }

  //   Get all members of a project
  @MessagePattern({ cmd: 'get_members_by_project_id' })
  getMembersByProjectId(id: string) {
    return this.projectService.findProjectMembersByProjectId(id);
  }

  //   Get all members
  @MessagePattern({ cmd: 'get_all_members' })
  getAllMembers() {
    return this.projectService.getAllMembers();
  }
}
