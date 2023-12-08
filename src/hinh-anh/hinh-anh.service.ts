import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HinhAnh } from './entities/hinh-anh.entity';

@Injectable()
export class HinhAnhService {
  prisma = new PrismaClient();

  async findAll(): Promise<any> {
    const data = await this.prisma.hinh_anh.findMany();
    return data;
  }

  async findOne(id: number): Promise<any | null> {
    const data = await this.prisma.hinh_anh.findUnique({
      where: {
        hinh_id: id,
      },
    });
    return data;
  }
  async findByName(substring: string): Promise<any | null> {
    const data = await this.prisma.hinh_anh.findMany({
      where: { ten_hinh: { contains: substring } },
    });
    return data;
  }

  async findHinhAnhAndNguoiDungById(hinhAnhId: number): Promise<any | null> {
    return this.prisma.hinh_anh.findUnique({
      where: { hinh_id: hinhAnhId },
      include: { nguoi_dung: true },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} hinhAnh`;
  }
}
