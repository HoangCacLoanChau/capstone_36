import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async findAll(): Promise<any> {
    const data = await this.prisma.nguoi_dung.findMany();
    return data;
  }

  async findOne(id: number): Promise<any> {
    const data = await this.prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: id,
      },
    });
    return data;
  }
}
