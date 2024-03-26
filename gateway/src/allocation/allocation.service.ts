import { Inject, Injectable } from '@nestjs/common';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
@ApiTags('Allocation')
export class AllocationService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createAllocationDto: CreateAllocationDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_activity' },
        createAllocationDto,
      ),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_allocations');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_allocations' }, {}),
    );
    await this.cacheService.set('find_all_allocations', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(
      `find_allocation_by_id_${id}`,
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_allocation_by_id' }, { id }),
    );
    await this.cacheService.set(`find_allocation_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateAllocationDto: UpdateAllocationDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_allocation' },
        { id, updateAllocationDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_allocation' }, { id }),
    );
  }
}
