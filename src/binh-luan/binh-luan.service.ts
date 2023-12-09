import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanDto } from './dto/create-binh-luan.dto';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();
  async findAll(): Promise<any> {
    return this.prisma.binh_luan.findMany();
  }

  async findManyByAnhId(HinhId: number): Promise<any> {
    return this.prisma.binh_luan.findMany({
      where: { hinh_id: HinhId },
    });
  }

  async createBinhLuan(
    nguoi_dung_id: number,
    binhLuanDto: BinhLuanDto,
  ): Promise<any> {
    const { hinh_id, noi_dung } = binhLuanDto;

    //check if user and hinh existed
    const checkNguoiDung = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id },
    });

    const checkHinh = await this.prisma.hinh_anh.findUnique({
      where: { hinh_id },
    });

    if (!checkNguoiDung || !checkHinh) {
      throw new NotFoundException('NguoiDung or HinhAnh not found');
    } else {
      const createdBinhLuan = await this.prisma.binh_luan.create({
        data: {
          ngay_binh_luan: new Date(),
          noi_dung,
          nguoi_dung: { connect: { nguoi_dung_id } },
          hinh: { connect: { hinh_id } },
        },
      });
      return createdBinhLuan;
    }
  }
}
