import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'Jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  prisma = new PrismaClient();

  async validate(tokenDecode: any) {
    const { nguoi_dung_id, email } = tokenDecode.data;
    const checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return { nguoi_dung_id, email };
    }
    throw new UnauthorizedException('Invalid token');
    // kiểm tra user_id có trong database hay ko

    // nếu có -> pass
    // nếu ko -> ko có permission
  }
}
