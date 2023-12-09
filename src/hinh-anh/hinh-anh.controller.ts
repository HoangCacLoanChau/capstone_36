import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HinhAnhService } from './hinh-anh.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Hinh Anh')
@Controller('hinh-anh')
export class HinhAnhController {
  constructor(private readonly hinhAnhService: HinhAnhService) {}

  @Get(':id')
  async findHinhAnhAndNguoiDungById(@Param('id') hinhAnhId: number) {
    const result = await this.hinhAnhService.findHinhAnhAndNguoiDungById(
      Number(hinhAnhId),
    );

    if (!result) {
      throw new NotFoundException(`Hinh Anh with ID ${hinhAnhId} not found`);
    }

    return result;
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Jwt'))
  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.hinhAnhService.remove(Number(id), req.user.nguoi_dung_id);
  }
}
