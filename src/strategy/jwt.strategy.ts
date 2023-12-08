import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  prisma = new PrismaClient();

  async validate(tokenDecode: any) {
    const { email } = tokenDecode.data;
    const checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return true;
    }
    return false;
    // kiểm tra user_id có trong database hay ko

    // nếu có -> pass
    // nếu ko -> ko có permission
  }
}
