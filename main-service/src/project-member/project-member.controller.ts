import { MessagePattern } from '@nestjs/microservices';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ProjectMemberService } from './project-member.service';

export class ProjectMemberController {
  constructor(private readonly projectService: ProjectMemberService) {}
  //  Add member to project
  @MessagePattern('add_member')
  addMember(createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectService.addMember(createProjectMemberDto);
  }

  //   Delete member from project
  @MessagePattern('delete_member')
  deleteMember(deleteProjectMemberDto: DeleteProjectMemberDto) {
    return this.projectService.deleteMember(deleteProjectMemberDto);
  }

  //   Get all members of a project
  @MessagePattern('get_members_by_project_id')
  getMembersByProjectId(id: string) {
    return this.projectService.getMembersByProjectId(id);
  }

  //   Get all members
  @MessagePattern('get_all_members')
  getAllMembers() {
    return this.projectService.getAllMembers();
  }
}
