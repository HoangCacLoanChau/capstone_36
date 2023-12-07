import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async findAll() {
    const data = await this.prisma.nguoi_dung.findMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
