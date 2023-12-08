import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();
  async findAll(): Promise<any> {
    return this.prisma.binh_luan.findMany();
  }

  async findOne(id: number): Promise<any> {
    return this.prisma.binh_luan.findUnique({
      where: { binh_luan_id: id },
    });
  }
}
