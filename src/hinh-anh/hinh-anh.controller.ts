import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { HinhAnhService } from './hinh-anh.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Hinh Anh')
@Controller('hinh-anh')
export class HinhAnhController {
  constructor(private readonly hinhAnhService: HinhAnhService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hinhAnhService.findOne(+id);
  }

  @ApiQuery({
    name: 'tenHinh',
    type: String,
    description: 'search query',
    required: false,
  })
  @Get()
  async findOneByName(@Query('tenHinh') tenHinh?: string) {
    if (tenHinh) {
      const hinhAnhList = await this.hinhAnhService.findByName(tenHinh);
      return hinhAnhList;
    } else {
      return this.hinhAnhService.findAll();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hinhAnhService.remove(+id);
  }
}
