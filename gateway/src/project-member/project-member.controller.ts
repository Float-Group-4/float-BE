import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ProjectMemberService } from './project-member.service';
import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('project-member')
@ApiTags('Project Member')
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

  @Get(':id/members')
  getMembersByProjectId(@Param('id') id: string) {
    return this.projectService.getMembersByProjectId(id);
  }

  @Get('members')
  getAllMembers() {
    return this.projectService.getAllMembers();
  }
}
