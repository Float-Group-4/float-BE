import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/udpate-view.dto';

@Controller('view')
@ApiTags('View')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.createView(createViewDto);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.viewService.getView(id);
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
  getAll() {
    return this.viewService.getAllViews();
  }

  @Get('team/:id')
  getViewsByTeamId(
    @Param('id') teamId: string,
    @Body('userId') userId: string,
  ) {
    return this.viewService.getViewsByTeamId(teamId, userId);
  }

  @Get('personal/:id')
  getPersonalViews(@Param('id') userId: string) {
    return this.viewService.getPersonalViews(userId);
  }

  @Get('public/:userId')
  getPublicViewsByUserId(@Param('userId') userId: string) {
    return this.viewService.getPublicViewsByUserId(userId);
  }
}
