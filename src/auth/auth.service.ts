import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'login';
  }
  register(): string {
    return 'register';
  }
}