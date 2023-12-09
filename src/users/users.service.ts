import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUserInfo(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const existingUser = await this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updatedUser = await this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id: userId },
      data: updateUserDto,
    });

    return updatedUser;
  }
}
