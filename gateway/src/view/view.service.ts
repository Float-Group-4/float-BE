import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/udpate-view.dto';

@Injectable()
export class ViewService {
  constructor(
    @Inject('VIEW_SERVICE') private readonly viewServiceClient: ClientProxy,
  ) {}

  createView(createViewDto: CreateViewDto) {
    return this.viewServiceClient.send({ cmd: 'create_view' }, createViewDto);
  }

  updateView(id: number, updateViewDto: UpdateViewDto) {
    const data = {
      id,
      ...updateViewDto,
    };
    return this.viewServiceClient.send({ cmd: 'update_view' }, data);
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

  getViewsByTeamId(teamId: string, teamMemberId: string) {
    return this.viewServiceClient.send(
      { cmd: 'get_view_by_team_id' },
      { teamId, teamMemberId },
    );
  }

  getPersonalViews(userId: string) {
    return this.viewServiceClient.send({ cmd: 'get_personal_views' }, userId);
  }

  getPublicViewsByUserId(userId: string) {
    return this.viewServiceClient.send(
      { cmd: 'get_public_views_by_user_id' },
      userId,
    );
  }
}
