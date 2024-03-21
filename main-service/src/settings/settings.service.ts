import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}
  create(createSettingDto: CreateSettingDto) {
    return this.prisma.setting.create({
      data: {
        ...createSettingDto,
      },
    });
  }

  findAll() {
    return this.prisma.setting.findMany();
  }

  findOne(id: string) {
    return this.prisma.setting.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.prisma.setting.update({
      where: {
        id,
      },
      data: {
        ...updateSettingDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.setting.delete({
      where: {
        id,
      },
    });
  }
}
