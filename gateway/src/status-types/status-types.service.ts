import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusTypeDto } from './dto/create-status-type.dto';
import { UpdateStatusTypeDto } from './dto/update-status-type.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Status Types')
export class StatusTypesService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}
  create(createStatusTypeDto: CreateStatusTypeDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'create_status_type' },
        createStatusTypeDto,
      ),
    );
  }

  findAll() {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_status_types' }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_status_type_by_id' }, id),
    );
  }

  update(id: string, updateStatusTypeDto: UpdateStatusTypeDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_status_type' },
        { id, updateStatusTypeDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_status_type' }, id),
    );
  }
}
