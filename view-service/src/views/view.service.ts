import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateViewDto } from './dto/update-view.dto';
@Injectable()
@ApiTags('View')
export class ViewService {
  constructor(private readonly prisma: PrismaService) {}

  createView(createViewDto: CreateViewDto) {
    const settings = createViewDto.settings as any;
    const filters = createViewDto.filters as any;
    return this.prisma.view.create({
      data: {
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        name: createViewDto.name,
        personal: createViewDto.personal,
        settings: { settings },
        filters: {
          filters,
        },
        pinned: createViewDto.pinned,
        created_by: createViewDto.created_by,
        modified_by: createViewDto.modified_by,
      },
    });
  }
  // Fix bugs here
  updateView(id: any, updateViewDto: UpdateViewDto) {
    const settings = id.updateViewDto.settings as any;
    const filters = id.updateViewDto.filters as any;
    const { id: nID, rest } = id;
    return this.prisma.view.update({
      where: {
        id: +id.id,
      },
      data: {
        created: rest?.created,
        modified: rest?.modified,
        created_by: rest?.created_by,
        modified_by: rest?.modified_by,
        name: rest?.name,
        personal: rest?.personal,
        pinned: rest?.pinned,
        settings: { settings },
        filters: {
          filters,
        },
      },
    });
  }
  getView(id: number) {
    const view = this.prisma.view.findUnique({
      where: {
        id: +id,
      },
    });
    return view;
  }
  deleteView(id: number) {
    return this.prisma.view.delete({
      where: {
        id: +id,
      },
    });
  }

  getAllViews() {
    return this.prisma.view.findMany();
  }
}
