import { Body, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { TimeOffTypesService } from './time-off-types.service';

export class TimeOffTypesController {
  constructor(private readonly timeOffTypesService: TimeOffTypesService) {}

  @MessagePattern('create_time_off_type')
  create(@Body() createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.timeOffTypesService.create(createTimeOffTypeDto);
  }

  @MessagePattern('find_all_time_off_types')
  findAll() {
    return this.timeOffTypesService.findAll();
  }

  @MessagePattern('find_time_off_type_by_id')
  findOne(@Param('id') id: string) {
    return this.timeOffTypesService.findOne(id);
  }

  @MessagePattern('update_time_off_type')
  update(
    @Param('id') id: string,
    @Body() updateTimeOffTypeDto: UpdateTimeOffTypeDto,
  ) {
    return this.timeOffTypesService.update(id, updateTimeOffTypeDto);
  }

  @MessagePattern('remove_time_off_type')
  remove(@Param('id') id: string) {
    return this.timeOffTypesService.remove(id);
  }
}
