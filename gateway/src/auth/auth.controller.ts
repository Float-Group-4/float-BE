import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerInfo: RegisterDTO) {
    return this.authService.register(registerInfo);
  }

  @Post('user-login')
  login(@Body() loginInfo: LoginDTO) {
    return this.authService.login(loginInfo);
  }

  @Post('google-login')
  googleLogin(@Query('token') googleLoginInfo: string) {
    return this.authService.googleLogin(googleLoginInfo);
  }

  @Post('logout')
  logout(@Query('token') token: string) {
    return this.authService.logout(token);
  }

  @Get('user-info')
  getUserInfo(@Query('token') token: string) {
    return this.authService.getUserInfo(token);
  }
}
