import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
@ApiTags('Time Offs')
export class TimeOffsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createTimeOffDto: CreateTimeOffDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_time_off' }, createTimeOffDto),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_time_offs');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_time_offs' }, {}),
    );
    await this.cacheService.set('find_all_time_offs', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_time_off_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_time_off_by_id' }, id),
    );
    await this.cacheService.set(`find_time_off_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateTimeOffDto: UpdateTimeOffDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_time_off' },
        { id, updateTimeOffDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_time_off' }, id),
    );
  }
}
