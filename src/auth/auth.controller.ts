import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDTO): any {
    return this.authService.login(body);
  }

  @Post('/sign-up')
  register(@Body() body: registerDTO): any {
    return this.authService.register(body);
  }
}
