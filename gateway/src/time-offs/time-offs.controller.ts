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
import { TimeOffsService } from './time-offs.service';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';

@Controller('time-offs')
@ApiTags('Time Offs')
export class TimeOffsController {
  constructor(private readonly timeOffsService: TimeOffsService) {}

  @Post()
  create(@Body() createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffsService.create(createTimeOffDto);
  }

  @Get()
  findAll() {
    return this.timeOffsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeOffsService.findOne(id);
  }

  @Get('team/:teamId')
  findAllTimeOffByTeamId(@Param('teamId') teamId: string) {
    return this.timeOffsService.findAllTimeOffByTeamId(teamId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffsService.update(id, updateTimeOffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffsService.remove(id);
  }
}
