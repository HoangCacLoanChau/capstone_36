import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import { loginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { registerDTO } from './dto/register.dto';
import { User } from './entities/auth.entity';

@Injectable()
export class AuthService {
  // lib JwtService
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //
  //Prisma
  prisma = new PrismaClient();
  //

  async login(body: loginDTO): Promise<string> {
    //check email
    const { email, mat_khau } = body;
    const checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      //check password
      const checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);

      if (checkPass) {
        //create token by jwtService
        const data = {
          nguoi_dung_id: checkEmail.nguoi_dung_id,
          email,
          ho_ten: checkEmail.ho_ten,
        };
        const token = this.jwtService.sign(
          { data: data },
          {
            expiresIn: this.configService.get('EXPIRE_IN'),
            secret: this.configService.get('SECRET_KEY'),
          },
        );
        return token;
      } else {
        return 'mật khẩu sai';
      }
    } else {
      return 'Something wrong happen';
    }
    ///
  }
  async register(body: registerDTO): Promise<any> {
    const checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: body.email,
      },
    });
    if (checkEmail) {
      return 'Email đã tồn tại';
    } else {
      //create new user
      const newData = await this.prisma.nguoi_dung.create({
        data: { ...body, mat_khau: bcrypt.hashSync(body.mat_khau, 10) },
      });
      return newData;
    }
  }
}
