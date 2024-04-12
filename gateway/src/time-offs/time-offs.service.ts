import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeOffDto } from './dto/create-time-off.dto';
import { UpdateTimeOffDto } from './dto/update-time-off.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Time Offs')
export class TimeOffsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createTimeOffDto: CreateTimeOffDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_time_off' }, createTimeOffDto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_time_offs' }, {}),
    );
  }

  findAllTimeOffByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_time_offs_by_team_id' }, teamId),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_time_off_by_id' }, id),
    );
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
