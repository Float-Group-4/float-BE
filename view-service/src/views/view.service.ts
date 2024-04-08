import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateViewDto } from './dto/update-view.dto';
@Injectable()
export class ViewService {
  constructor(private prisma: PrismaService) {}

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
  updateView(data: UpdateViewDto) {
    const { id, ...rest } = data;
    return this.prisma.view.update({
      where: {
        id: +id,
      },
      data: {
        ...rest,
        settings: rest.settings as any,
        filters: rest.filters as any,
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
