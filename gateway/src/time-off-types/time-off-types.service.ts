import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Time Off Types')
export class TimeOffTypesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}
  create(createTimeOffTypeDto: CreateTimeOffTypeDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_time_off_type' },
        createTimeOffTypeDto,
      ),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_time_off_types' }, {}),
    );
  }

  findByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'find_time_off_types_by_team_id' },
        teamId,
      ),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_time_off_type_by_id' }, id),
    );
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
