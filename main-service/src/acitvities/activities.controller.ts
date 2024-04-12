import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @MessagePattern({ cmd: 'create_activity' })
  create(createAcitvityDto: CreateActivityDto) {
    return this.activitiesService.create(createAcitvityDto);
  }

  @MessagePattern({ cmd: 'find_all_activities' })
  findAll() {
    return this.activitiesService.findAll();
  }

  @MessagePattern({ cmd: 'find_activity_by_id' })
  findOne(id: string) {
    return this.activitiesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_activity' })
  update({
    id,
    updateAcitvityDto,
  }: {
    id: string;
    updateAcitvityDto: UpdateActivityDto;
  }) {
    return this.activitiesService.update(id, updateAcitvityDto);
  }

  @MessagePattern({ cmd: 'remove_activity' })
  remove(id: string) {
    return this.activitiesService.remove(id);
  }
}
