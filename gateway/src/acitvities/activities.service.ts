import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Activities')
export class ActivitiesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  create(createActivityDto: CreateActivityDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_activity' },
        createActivityDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_activities');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_activities' }, {}),
    );
    await this.cacheService.set('find_all_activities', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_activity_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_activity_by_id' }, { id }),
    );
    await this.cacheService.set(`find_activity_by_id_${id}`, data);
    return data;
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
      this.mainServiceClient.send({ cmd: 'remove_activity' }, { id }),
    );
  }
}
