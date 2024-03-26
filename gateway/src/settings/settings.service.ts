import { Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createSettingDto: CreateSettingDto) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'create_setting' }, createSettingDto),
    );
  }

  async findAll() {
    const cachedData = await this.cacheService.get('find_all_settings');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_all_settings' }, {}),
    );
    await this.cacheService.set('find_all_settings', data);
    return data;
  }

  async findOne(id: string) {
    const cachedData = await this.cacheService.get(`find_setting_by_id_${id}`);
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const data = firstValueFrom(
      this.mainServiceClient.send({ cmd: 'find_setting_by_id' }, id),
    );
    await this.cacheService.set(`find_setting_by_id_${id}`, data);
    return data;
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return firstValueFrom(
      this.mainServiceClient.send(
        { cmd: 'update_setting' },
        { id, updateSettingDto },
      ),
    );
  }

  remove(id: string) {
    return firstValueFrom(
      this.mainServiceClient.send({ cmd: 'remove_setting' }, id),
    );
  }
}
