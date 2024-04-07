import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/udpate-view.dto';

@Injectable()
@ApiTags('view')
export class ViewService {
  constructor(
    @Inject('VIEW_SERVICE') private readonly viewServiceClient: ClientProxy,
  ) {}

  createView(createViewDto: CreateViewDto) {
    return this.viewServiceClient.send({ cmd: 'create_view' }, createViewDto);
  }

  updateView(id: number, updateViewDto: UpdateViewDto) {
    return this.viewServiceClient.send(
      { cmd: 'update_view' },
      {
        id,
        updateViewDto,
      },
    );
  }

  getView(id: number) {
    return this.viewServiceClient.send({ cmd: 'get_view' }, id);
  }

  deleteView(id: number) {
    return this.viewServiceClient.send({ cmd: 'delete_view' }, id);
  }

  getAllViews() {
    return this.viewServiceClient.send({ cmd: 'get_all_views' }, {});
  }
}
