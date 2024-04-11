import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { TimeOffTypesService } from './time-off-types.service';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';

@Controller('time-off-types')
@ApiTags('Time Off Types')
export class TimeOffTypesController {
  constructor(private readonly timeOffTypesService: TimeOffTypesService) {}

  @Post()
  create(@Body() createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.timeOffTypesService.create(createTimeOffTypeDto);
  }

  @Get()
  findAll() {
    return this.timeOffTypesService.findAll();
  }

  @Get('team/:teamId')
  findByTeamId(@Param('teamId') teamId: string) {
    return this.timeOffTypesService.findByTeamId(teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeOffTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeOffTypeDto: UpdateTimeOffTypeDto,
  ) {
    return this.timeOffTypesService.update(id, updateTimeOffTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffTypesService.remove(id);
  }
}
