import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/udpate-view.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('view')
@ApiTags('View')
export class ViewController {
  constructor(
    private readonly viewService: ViewService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.createView(createViewDto);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async get(@Param('id') id: number) {
    const cached = await this.redisService.get('get_View_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.viewService.getView(id);
    if (result) await this.redisService.set('get_View_' + id, result);
    return result;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.viewService.deleteView(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateViewDto: UpdateViewDto) {
    return this.viewService.updateView(id, updateViewDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const cached = await this.redisService.get('get_Views');
    if (cached) {
      return cached;
    }
    const result = await this.viewService.getAllViews();
    if (result) await this.redisService.set('get_Views', result);
    return result;
  }

  @Get('team/:id')
  @UseInterceptors(CacheInterceptor)
  async getViewsByTeamId(
    @Param('id') teamId: string,
    @Body('teamMemberId') teamMemberId: string,
  ) {
    const cached = await this.redisService.get('get_ViewsByTeamId_' + teamId);
    if (cached) {
      return cached;
    }
    const result = await this.viewService.getViewsByTeamId(
      teamId,
      teamMemberId,
    );
    if (result)
      await this.redisService.set('get_ViewsByTeamId_' + teamId, result);
    return result;
  }

  @Get('personal/:id')
  @UseInterceptors(CacheInterceptor)
  async getPersonalViews(@Param('id') userId: string) {
    const cached = await this.redisService.get('get_PersonalViews_' + userId);
    if (cached) {
      return cached;
    }
    const result = await this.viewService.getPersonalViews(userId);
    if (result)
      await this.redisService.set('get_PersonalViews_' + userId, result);
    return result;
  }

  @Get('public/:userId')
  @UseInterceptors(CacheInterceptor)
  async getPublicViewsByUserId(@Param('userId') userId: string) {
    const cached = await this.redisService.get(
      'get_PublicViewsByUserId_' + userId,
    );
    if (cached) {
      return cached;
    }
    const result = await this.viewService.getPublicViewsByUserId(userId);
    if (result)
      await this.redisService.set('get_PublicViewsByUserId_' + userId, result);
    return result;
  }
}
