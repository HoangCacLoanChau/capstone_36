import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateHinhAnhDto } from './dto/create-hinh-anh.dto';

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
    const data = await this.prisma.hinh_anh.findUnique({
      where: { hinh_id: hinhAnhId },
      include: { nguoi_dung: true },
    });
    return data;
  }

  async remove(hinhId: number, nguoi_dung_id: number): Promise<any> {
    //check if user and hinh existed
    const checkHinh = await this.prisma.hinh_anh.findUnique({
      where: { hinh_id: hinhId },
    });

    const checkNguoiDung = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: nguoi_dung_id },
    });

    if (checkNguoiDung.nguoi_dung_id !== checkHinh.nguoi_dung_id) {
      throw new UnauthorizedException('You are not allowed');
    }

    if (!checkNguoiDung || !checkHinh) {
      throw new NotFoundException('NguoiDung or HinhAnh not found');
    } else {
      // Delete associated binh_luan records
      await this.prisma.binh_luan.deleteMany({
        where: { hinh_id: hinhId },
      });

      // Delete associated luu_anh records
      await this.prisma.luu_anh.deleteMany({
        where: { hinh_id: hinhId },
      });
      await this.prisma.hinh_anh.delete({
        where: { hinh_id: hinhId },
      });
    }
  }

  async isHinhAnhSavedByHinhId(
    hinhAnhId: number,
    nguoiDungId: number,
  ): Promise<boolean> {
    const luuAnh = await this.prisma.luu_anh.findFirst({
      where: { hinh_id: hinhAnhId, nguoi_dung_id: nguoiDungId },
    });
    //convert to boolean
    return !!luuAnh;
  }

  async getHinhAnhByUserId(nguoiDungId: number): Promise<any> {
    const hinhAnhList = await this.prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: nguoiDungId },
    });

    return hinhAnhList;
  }

  async getHinhAnhDaLuuByUser(nguoiDungId: number): Promise<any> {
    const hinhanhList = await this.prisma.luu_anh.findMany({
      where: { nguoi_dung_id: nguoiDungId },
    });
    return hinhanhList;
  }

  async createHinhAnh(
    createHinhAnhDto: CreateHinhAnhDto,
    nguoiDungId: number,
  ): Promise<any> {
    const newHinhAnh = await this.prisma.hinh_anh.create({
      data: { ...createHinhAnhDto, nguoi_dung_id: nguoiDungId },
    });

    return newHinhAnh;
  }
}
