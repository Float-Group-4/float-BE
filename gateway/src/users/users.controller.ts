import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const cached = await this.redisService.get('get_Users');
    if (cached) {
      return cached;
    }
    const result = await this.usersService.findAll();
    await this.redisService.set('get_Users', result);
    return result;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const cached = await this.redisService.get('get_User_' + id);
    if (cached) {
      return cached;
    }
    const result = await this.usersService.findOne(id);
    await this.redisService.set('get_User_' + id, result);
    return result;
  }

  @Get('email/:email')
  @UseInterceptors(CacheInterceptor)
  async findByEmail(@Param('email') email: string) {
    const cached = await this.redisService.get('get_User_by_email_' + email);
    if (cached) {
      return cached;
    }
    const result = await this.usersService.findByEmail(email);
    await this.redisService.set('get_User_by_email_' + email, result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
