import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    const cached = this.redisService.get('get_Roles');
    if (cached) {
      return cached;
    }
    const result = this.rolesService.findAll();
    this.redisService.set('get_Roles', result);
    return result;
  }

  @Get('team/:teamId')
  @UseInterceptors(CacheInterceptor)
  findByTeamId(@Param('teamId') teamId: string) {
    const cached = this.redisService.get('get_RolesByTeamId_' + teamId);
    if (cached) {
      return cached;
    }
    const result = this.rolesService.findByTeamId(teamId);
    this.redisService.set('get_RolesByTeamId_' + teamId, result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    const cached = this.redisService.get('get_Role_' + id);
    if (cached) {
      return cached;
    }
    const result = this.rolesService.findOne(id);
    this.redisService.set('get_Role_' + id, result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
