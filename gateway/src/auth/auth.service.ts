import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
@ApiTags('Allocation')
export class AuthService {
  constructor(
    private readonly http: HttpService,
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
    private readonly redisService: RedisService,
    private readonly userService: UsersService,
  ) {}

  async register(registerInfo: RegisterDTO) {
    try {
      const res = await firstValueFrom(
        this.http.post('http://localhost:4005/api/register', registerInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );

      if (res.status === 200) {
        if (res.data.errorMessage) {
          throw new HttpException(
            res.data.errorMessage,
            HttpStatus.BAD_REQUEST,
          );
        }
        return firstValueFrom(
          this.mainServiceClient.send(
            { cmd: 'create_user' },
            {
              email: registerInfo.email,
              name: registerInfo.name,
            },
          ),
        );
      }
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }
  }

  async login(loginInfo: LoginDTO) {
    const res = await firstValueFrom(
      this.http.post('http://localhost:4005/api/user-login', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
    if (res.status === 200) {
      if (res.data.error_description) {
        throw new HttpException(
          res.data.error_description,
          HttpStatus.BAD_REQUEST,
        );
      }
      return res.data;
    }
  }

  async googleLogin(token: string) {
    const res = await firstValueFrom(
      this.http.post(`http://localhost:4005/api/google-login?token=${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
    if (res.status === 200) {
      if (res.data.error_description) {
        throw new HttpException(
          res.data.error_description,
          HttpStatus.BAD_REQUEST,
        );
      }
      return res.data;
    }
  }

  async logout(token: string) {
    const res = await firstValueFrom(
      this.http.post(`http://localhost:4005/api/logout?RefreshToken=${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
    if (res.status === 200) {
      if (res.data.error_description) {
        throw new HttpException(
          res.data.error_description,
          HttpStatus.BAD_REQUEST,
        );
      }
      return res.data;
    }
  }

  async getUserInfo(token: string) {
    try {
      const res = await firstValueFrom(
        this.http.get(`http://localhost:4005/api/user-info?token=${token}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
      if (res.status === 200) {
        const email = res.data.payload.email;
        const cached = await this.redisService.get(
          'get_User_by_email_' + email,
        );
        if (cached) {
          return cached;
        }
        const result = await this.userService.findByEmail(email);
        await this.redisService.set('get_User_by_email_' + email, result);
        return result;
      }
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
