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
  async create(createActivityDto: CreateActivityDto) {
    await this.cacheService.reset();
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_activity' },
        createActivityDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_activities');
    console.log(cachedData);
    if (cachedData) {
      console.log(`Getting data from cache! aaa`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_activities' }, {}),
    );
    await this.cacheService.set('find_all_activities', await data, 0);
    const cd = await this.cacheService.get('find_all_activities');
    if (cd) {
      console.log(`Getting data from cache!`, data, cd);
      // return cachedData;
    }
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_activity_by_id_${id}`);

    if (cachedData) {
      console.log(`Getting data from cachee!`);
      return cachedData;
    }
    const data = await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_activity_by_id' }, id),
    );
    await this.cacheService.set(`find_activity_by_id_${id}`, await data, 0);
    return data;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    await this.cacheService.reset();
    return await firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_activity' },
        { id, updateActivityDto },
      ),
    );
  }

  async remove(id: string) {
    await this.cacheService.reset();
    return await firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_activity' }, { id }),
    );
  }
}
