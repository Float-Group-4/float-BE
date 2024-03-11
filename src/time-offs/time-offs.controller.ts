import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeOffsService } from './time-offs.service';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('time-offs')
@ApiTags('TimeOffs')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffsService.update(id, updateTimeOffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffsService.remove(id);
  }
}
