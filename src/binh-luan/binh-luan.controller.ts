import { Controller, Get, Param } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Binh Luan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
  @Get()
  findAll() {
    return this.binhLuanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.binhLuanService.findOne(+id);
  }
}
