import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Time Off Types')
export class TimeOffTypesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  create(createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_time_off_type' },
        createTimeOffTypeDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_time_off_types');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_time_off_types' }, {}),
    );
    await this.cacheService.set('find_all_time_off_types', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(
      `find_time_off_type_by_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_time_off_type_by_id' }, id),
    );
    await this.cacheService.set(`find_time_off_type_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateTimeOffTypeDto: UpdateTimeOffTypeDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_time_off_type' },
        { id, updateTimeOffTypeDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_time_off_type' }, id),
    );
  }
}
