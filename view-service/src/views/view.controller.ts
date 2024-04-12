import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateViewDto } from './dto/update-view.dto';
import { GetViewByTeamDto } from './dto/get-view-by-team.dto';

@Controller('view')
@ApiTags('View')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @MessagePattern({ cmd: 'create_view' })
  createView(createViewDto: CreateViewDto) {
    return this.viewService.createView(createViewDto);
  }
  @MessagePattern({ cmd: 'update_view' })
  update(data: UpdateViewDto) {
    return this.viewService.updateView(data);
  }

  @MessagePattern({ cmd: 'get_view' })
  getView(id: number) {
    return this.viewService.getView(id);
  }
  @MessagePattern({ cmd: 'delete_view' })
  deleteView(id: number) {
    return this.viewService.deleteView(id);
  }

  @MessagePattern({ cmd: 'get_all_views' })
  getAllViews() {
    return this.viewService.getAllViews();
  }

  @MessagePattern({ cmd: 'get_view_by_team_id' })
  getViewByTeamId(getViewByTeamDto: GetViewByTeamDto) {
    return this.viewService.getViewByTeamId(getViewByTeamDto);
  }

  @MessagePattern({ cmd: 'get_personal_views' })
  getPersonalViews(userId: string) {
    return this.viewService.getPersonalViews(userId);
  }

  @MessagePattern({ cmd: 'get_public_views_by_user_id' })
  getPublicViewsByUserId(userId: string) {
    return this.viewService.getPublicViewsByUserId(userId);
  }
}
