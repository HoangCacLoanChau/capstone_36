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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Jwt'))
  @Get(':id/is-saved/')
  async isHinhAnhSavedByHinhId(
    @Param('id') hinhAnhId: string,
    @Req() req,
  ): Promise<{ isSaved: boolean }> {
    const id = Number(hinhAnhId);
    const nguoiDungId = Number(req.user.nguoi_dung_id);

    if (isNaN(id) || isNaN(nguoiDungId)) {
      throw new NotFoundException('Invalid Hinh Anh ID or Nguoi Dung ID');
    }

    const isSaved = await this.hinhAnhService.isHinhAnhSavedByHinhId(
      id,
      nguoiDungId,
    );

    return { isSaved };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('Jwt'))
  @Get('/da-tao')
  async getHinhAnhByUserId(@Req() req): Promise<any> {
    const nguoiDungId = Number(req.user.nguoi_dung_id);

    if (!nguoiDungId) {
      throw new NotFoundException('Invalid Nguoi Dung ID');
    }

    const hinhAnhList =
      await this.hinhAnhService.getHinhAnhByUserId(nguoiDungId);

    return hinhAnhList;
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('Jwt'))
  @Get('/da-luu')
  async getHinhAnhDaLuu(@Req() req): Promise<any> {
    const nguoiDungId = Number(req.user.nguoi_dung_id);

    if (!nguoiDungId) {
      throw new NotFoundException('Invalid Nguoi Dung ID');
    }

    const hinhAnhList =
      await this.hinhAnhService.getHinhAnhDaLuuByUser(nguoiDungId);

    return hinhAnhList;
  }
  @Get(':id')
  async findHinhAnhAndNguoiDungById(@Param('id') hinhAnhId: number) {
    try {
      const result = await this.hinhAnhService.findHinhAnhAndNguoiDungById(
        Number(hinhAnhId),
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @ApiQuery({
    name: 'tenHinh',
    type: String,
    description: 'search query',
    required: false,
  })
  @Get()
  async findByNameOrFindAll(@Query('tenHinh') tenHinh?: string) {
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
