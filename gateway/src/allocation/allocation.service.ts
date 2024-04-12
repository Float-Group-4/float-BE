import { Inject, Injectable } from '@nestjs/common';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
@ApiTags('Allocation')
export class AllocationService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createAllocationDto: CreateAllocationDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_allocation' },
        createAllocationDto,
      ),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_allocations' }, {}),
    );
  }

  findAllByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_allocations_by_team_id' },
        teamId,
      ),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_allocation_by_id' }, id),
    );
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
      this.mainServiceClient.send({ cmd: 'remove_allocation' }, id),
    );
  }
}
