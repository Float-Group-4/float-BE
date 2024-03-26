import { CacheInterceptor } from '@nestjs/cache-manager';
import { CreateProjectMemberDto } from './dto/create-project-member.dto';
import { DeleteProjectMemberDto } from './dto/delete-project-member.dto';
import { ProjectMemberService } from './project-member.service';
import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
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

  @Get(':id/members')
  @UseInterceptors(CacheInterceptor)
  getMembersByProjectId(@Param('id') id: string) {
    return this.projectService.getMembersByProjectId(id);
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  getAllMembers() {
    return this.projectService.getAllMembers();
  }
}
