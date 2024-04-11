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
import { StatusTypesService } from './status-types.service';
import { CreateStatusTypeDto } from './dto/create-status-type.dto';
import { UpdateStatusTypeDto } from './dto/update-status-type.dto';

@Controller('status-types')
@ApiTags('status Types')
export class StatusTypesController {
  constructor(private readonly statusTypesService: StatusTypesService) {}

  @Post()
  create(@Body() createStatusTypeDto: CreateStatusTypeDto) {
    return this.statusTypesService.create(createStatusTypeDto);
  }

  @Get()
  findAll() {
    return this.statusTypesService.findAll();
  }

  @Get('team/:teamId')
  findByTeamId(@Param('teamId') teamId: string) {
    return this.statusTypesService.findByTeamId(teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusTypeDto: UpdateStatusTypeDto,
  ) {
    return this.statusTypesService.update(id, updateStatusTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusTypesService.remove(id);
  }
}
