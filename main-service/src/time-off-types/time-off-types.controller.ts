import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { TimeOffTypesService } from './time-off-types.service';

@Controller('time-off-types')
export class TimeOffTypesController {
  constructor(private readonly timeOffTypesService: TimeOffTypesService) {}

  @MessagePattern({ cmd: 'create_time_off_type' })
  create(createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return this.timeOffTypesService.create(createTimeOffTypeDto);
  }

  @MessagePattern({ cmd: 'find_all_time_off_types' })
  findAll() {
    return this.timeOffTypesService.findAll();
  }

  @MessagePattern({ cmd: 'find_time_off_type_by_id' })
  findOne(id: string) {
    return this.timeOffTypesService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_time_off_types_by_team_id' })
  findByTeamId(teamId: string) {
    return this.timeOffTypesService.findByTeamId(teamId);
  }

  @MessagePattern({ cmd: 'update_time_off_type' })
  update({
    id,
    updateTimeOffTypeDto,
  }: {
    id: string;
    updateTimeOffTypeDto: UpdateTimeOffTypeDto;
  }) {
    return this.timeOffTypesService.update(id, updateTimeOffTypeDto);
  }

  @MessagePattern({ cmd: 'remove_time_off_type' })
  remove(id: string) {
    return this.timeOffTypesService.remove(id);
  }
}
