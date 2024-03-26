import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { TimeOffTypesService } from './time-off-types.service';

@Controller('time-off-types')
export class TimeOffTypesController {
  constructor(private readonly timeOffTypesService: TimeOffTypesService) {}

  @MessagePattern({ cmd: 'create_time_off_type' })
  create(@Body() createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.timeOffTypesService.create(createTimeOffTypeDto);
  }

  @MessagePattern({ cmd: 'find_all_time_off_types' })
  findAll() {
    return this.timeOffTypesService.findAll();
  }

  @MessagePattern({ cmd: 'find_time_off_type_by_id' })
  findOne(@Param('id') id: string) {
    return this.timeOffTypesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_time_off_type' })
  update(
    @Param('id') id: string,
    @Body() updateTimeOffTypeDto: UpdateTimeOffTypeDto,
  ) {
    return this.timeOffTypesService.update(id, updateTimeOffTypeDto);
  }

  @MessagePattern({ cmd: 'remove_time_off_type' })
  remove(@Param('id') id: string) {
    return this.timeOffTypesService.remove(id);
  }
}
