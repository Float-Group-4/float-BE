import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @MessagePattern('create_activity')
  create(createAcitvityDto: CreateActivityDto) {
    return this.activitiesService.create(createAcitvityDto);
  }

  @MessagePattern('find_all_activities')
  findAll() {
    return this.activitiesService.findAll();
  }

  @MessagePattern('find_activity_by_id')
  findOne(id: string) {
    return this.activitiesService.findOne(id);
  }

  @MessagePattern('update_activity')
  update(id: string, updateAcitvityDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateAcitvityDto);
  }

  @MessagePattern('remove_activity')
  remove(id: string) {
    return this.activitiesService.remove(id);
  }
}
