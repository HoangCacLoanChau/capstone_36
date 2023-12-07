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
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDTO): string {
    return 'login';
  }

  @Post('/sign-up')
  register(@Body() body: registerDTO): string {
    return 'login';
  }
}
