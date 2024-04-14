import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    return this.cache.get(key);
  }

  async set(key: string, value: any) {
    return this.cache.set(key, value);
  }

  async del(key: string) {
    return this.cache.del(key);
  }
}
