import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ProjectMemberService } from './project-member.service';
import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('project-members')
@ApiTags('Project Members')
export class ProjectMemberController {
  constructor(private readonly projectService: ProjectMemberService) {}

  @Post()
  addMember(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectService.addMember(createProjectMemberDto);
  }

  @Delete(':teamMemberId')
  deleteMember(@Body() deleteProjectMemberDto: DeleteProjectMemberDto) {
    return this.projectService.deleteMember(deleteProjectMemberDto);
  }

  @Get(':projectId/members')
  getMembersByProjectId(@Param('projectId') projectId: string) {
    return this.projectService.getMembersByProjectId(projectId);
  }

  @Get('')
  getAllMembers() {
    return this.projectService.getAllMembers();
  }
}
