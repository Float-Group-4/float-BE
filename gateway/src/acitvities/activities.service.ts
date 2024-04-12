import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
@ApiTags('Activities')
export class ActivitiesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}
  create(createActivityDto: CreateActivityDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_activity' },
        createActivityDto,
      ),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_activities' }, {}),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_activity_by_id' }, id),
    );
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    return await firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_activity' },
        { id, updateActivityDto },
      ),
    );
  }

  async remove(id: string) {
    return await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_activity' }, id),
    );
  }
}
