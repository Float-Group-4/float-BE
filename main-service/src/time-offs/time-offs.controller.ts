import { MessagePattern } from '@nestjs/microservices';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { TimeOffsService } from './time-offs.service';

export class TimeOffsController {
  constructor(private readonly timeOffsService: TimeOffsService) {}

  @MessagePattern('create_time_off')
  create(createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffsService.create(createTimeOffDto);
  }

  @MessagePattern('find_all_time_offs')
  findAll() {
    return this.timeOffsService.findAll();
  }

  @MessagePattern('find_time_off_by_id')
  findOne(id: string) {
    return this.timeOffsService.findOne(id);
  }

  @MessagePattern('update_time_off')
  update(id: string, updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffsService.update(id, updateTimeOffDto);
  }

  @MessagePattern('remove_time_off')
  remove(id: string) {
    return this.timeOffsService.remove(id);
  }
}
