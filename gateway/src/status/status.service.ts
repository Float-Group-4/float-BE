import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Statuses')
export class StatusService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  create(createStatusDto: CreateStatusDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_status' }, createStatusDto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_statuses' }, {}),
    );
  }

  findAllStatusByTeamId(teamId: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_statuses_by_team_id' }, teamId),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_status_by_id' }, id),
    );
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_status' },
        { id, updateStatusDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_status' }, id),
    );
  }
}
