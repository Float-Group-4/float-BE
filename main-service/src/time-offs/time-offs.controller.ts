import { MessagePattern } from '@nestjs/microservices';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { TimeOffsService } from './time-offs.service';
import { Controller } from '@nestjs/common';

@Controller('time-offs')
export class TimeOffsController {
  constructor(private readonly timeOffsService: TimeOffsService) {}

  @MessagePattern({ cmd: 'create_time_off' })
  create(createTimeOffDto: CreateTimeOffDto) {
    return this.timeOffsService.create(createTimeOffDto);
  }

  @MessagePattern({ cmd: 'find_all_time_offs' })
  findAll() {
    return this.timeOffsService.findAll();
  }

  @MessagePattern({ cmd: 'find_time_off_by_id' })
  findOne(id: string) {
    return this.timeOffsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_time_off' })
  update(id: string, updateTimeOffDto: UpdateTimeOffDto) {
    return this.timeOffsService.update(id, updateTimeOffDto);
  }

  @MessagePattern({ cmd: 'remove_time_off' })
  remove(id: string) {
    return this.timeOffsService.remove(id);
  }
}
