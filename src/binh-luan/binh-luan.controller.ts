import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BinhLuanDto } from './dto/create-binh-luan.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@ApiTags('Binh Luan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
  @Get(':HinhId')
  findByHinhId(@Param('HinhId') id: number) {
    return this.binhLuanService.findManyByAnhId(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('Jwt'))
  async createBinhLuan(@Req() req, @Body() binhLuanDto: BinhLuanDto) {
    console.log(req);

    const nguoi_dung_id = req.user.nguoi_dung_id;
    const createdBinhLuan = await this.binhLuanService.createBinhLuan(
      nguoi_dung_id,
      binhLuanDto,
    );

    // Return the created binh_luan in the response
    return createdBinhLuan;
  }
}
