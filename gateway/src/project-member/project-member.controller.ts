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
import { RedisService } from 'src/redis/redis.service';

@Controller('project-members')
@ApiTags('Project Members')
export class ProjectMemberController {
  constructor(
    private readonly projectService: ProjectMemberService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  addMember(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectService.addMember(createProjectMemberDto);
  }

  @Delete(':teamMemberId')
  deleteMember(@Body() deleteProjectMemberDto: DeleteProjectMemberDto) {
    return this.projectService.deleteMember(deleteProjectMemberDto);
  }

  @Get(':projectId/members')
  @UseInterceptors(CacheInterceptor)
  async getMembersByProjectId(@Param('projectId') projectId: string) {
    const cached = await this.redisService.get(
      'get_ProjectMembers_' + projectId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.projectService.getMembersByProjectId(projectId);
    if (result)
      await this.redisService.set('get_ProjectMembers_' + projectId, result);
    return result;
  }

  @Get('')
  @UseInterceptors(CacheInterceptor)
  async getAllMembers() {
    const cached = await this.redisService.get('get_ProjectMembers');
    if (cached) {
      return cached;
    }
    const result = await this.projectService.getAllMembers();
    if (result) await this.redisService.set('get_ProjectMembers', result);
    return result;
  }
}
