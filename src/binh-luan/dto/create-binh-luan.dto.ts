import { ApiProperty } from '@nestjs/swagger';

export class BinhLuanDto {
  @ApiProperty()
  hinh_id: number;
  @ApiProperty()
  noi_dung: string;
}
